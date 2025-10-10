import { useRef, useState } from "react";
import { Link } from "react-router";
import Avatar from "../Avatar.jsx";
import LikeImage from "../LikeImage.jsx";
import { parseValidationErrors } from "../../utils.js";
import Comments from "../comments/Comments.jsx";

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PostCard({
  post,
  handleLikeUnlikeClick,
  alreadyLiked,
  currentUserPicture,
  setPosts,
  userId,
}) {
  const [likes, setLikes] = useState(post._count.likes);
  const [liked, setLiked] = useState(alreadyLiked);
  const [errors, setErrors] = useState({});
  const pending = useRef();
  const menuEl = useRef();
  const [menuShown, setMenuShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const editPostForm = useRef();

  async function handleClick(event) {
    event.preventDefault();
    const status = await handleLikeUnlikeClick(event, liked);
    if (status.like) {
      setLikes((prev) => prev + 1);
      setLiked(true);
    } else if (status.unlike) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    } else {
      console.error("Failed to like or unlike.");
    }
  }

  const postContent = post.content.trim();
  const postCreatedAt = formatDate(post.createdAt);

  const handleTogglePostMenuClick = () => {
    setMenuShown((prev) => !prev);
  };

  const handlePostMenuOnLeave = () => {
    setMenuShown(false);
  };

  const handleDeletePostSubmit = (event) => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setMenuShown(false);
    if (!confirm(`The post will be deleted. Confirm?`)) {
      pending.current = false;
      return;
    }
    const deletePost = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/posts/${post.id}`;
        const res = await fetch(endpoint, {
          method: "DELETE",
          credentials: "include",
        });
        const json = await res.json();
        if (!json.error) {
          setPosts((prevPosts) =>
            prevPosts.filter((prevPost) => prevPost.id !== post.id)
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        pending.current = false;
      }
    };
    deletePost();
  };

  const handleEditPostClick = () => {
    setMenuShown(false);
    setIsEditing(true);
  };

  const handlePostInputKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      editPostForm.current.requestSubmit();
    } else if (event.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleCancelEditClick = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleEditPostFormSubmit = (event) => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const form = event.target;
    const formData = new FormData(form);
    const content = formData.get("content").trim();
    const editPost = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/posts/" + post.id;
        const res = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        });
        const json = await res.json();
        if (!json.error) {
          setErrors({});
          setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
              prevPost.id === json.id ? json : prevPost
            )
          );
          setIsEditing(false);
        } else {
          setErrors(parseValidationErrors(res.status, json));
        }
      } catch (err) {
        console.error(err);
      } finally {
        pending.current = false;
      }
    };
    if (content) {
      editPost();
    } else {
      pending.current = false;
      setErrors({ content: "Post must not be empty or whitespaces only." });
    }
  };

  return (
    <div className="post-card card">
      <div className="post-info-container">
        <Avatar
          picture={
            post.author.picture?.split("?")[0] ===
            currentUserPicture?.split("?")[0]
              ? currentUserPicture
              : post.author.picture
          }
        />
        <div className="post-author-time">
          <h4 className="post-author-name">
            <Link to={`/profile/${post.author.id}`}>
              {post.author.displayName}
            </Link>
          </h4>
          <p className="post-create-time">{postCreatedAt}</p>
        </div>
        {post.authorId === userId ? (
          <div className="post-menu" onMouseLeave={handlePostMenuOnLeave}>
            <button
              onClick={handleTogglePostMenuClick}
              className="post-menu-toggle"
              aria-label="Toggle Post Button"
            >
              ⋮
            </button>
            {menuShown && (
              <div className="post-menu-options" ref={menuEl}>
                <button
                  className="edit-post-button button"
                  to={`/post/${post.id}/edit`}
                  onClick={handleEditPostClick}
                  autoFocus
                >
                  Edit Post
                </button>
                <form onSubmit={handleDeletePostSubmit} method="post">
                  <button
                    className="delete-post-button button accent"
                    type="submit"
                  >
                    Delete Post
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="post-content">
        {isEditing ? (
          <form
            className="edit-post-form"
            ref={editPostForm}
            onSubmit={handleEditPostFormSubmit}
          >
            <label htmlFor={post.id + "-content"} className="sr-only">
              Post content:
            </label>
            <textarea
              name="content"
              id={post.id + "-content"}
              className="edit-post-content-input"
              defaultValue={post.content}
              onKeyDown={handlePostInputKeyDown}
              autoFocus
              required
            ></textarea>
            <div className="edit-post-buttons-container">
              <span className="shortcut-key">Ctrl + ↵</span>
              <button className="button" type="submit" name="save">
                Save Edit
              </button>
              <span className="shortcut-key">Esc</span>
              <button
                className="button alt"
                type="submit"
                name="cancel"
                onClick={handleCancelEditClick}
              >
                Cancel
              </button>
            </div>
            {errors.content && <p className="field-error">{errors.content}</p>}
          </form>
        ) : (
          <>
            {postContent.split("\n").map((line, i) =>
              line ? (
                <p key={i} className="post-content-lines">
                  {line}
                </p>
              ) : (
                <br key={i} />
              )
            )}
          </>
        )}
      </div>
      <hr />
      <div className="likes-and-comments-heading">
        <p className="comments-heading">Comments</p>
        <form className="like-form">
          <button
            className="like-button"
            type="button"
            onClick={handleClick}
            name={liked ? "unlike" : "like"}
            data-id={post.id}
            aria-label={`${likes} likes. Click to ${
              liked ? "unlike" : "like"
            }.`}
          >
            <LikeImage liked={liked} />
            {likes} like{likes === 1 ? null : "s"}
          </button>
        </form>
      </div>
      <hr />
      <Comments currentUserPicture={currentUserPicture} post={post} />
    </div>
  );
}
