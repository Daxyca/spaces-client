import { useState } from "react";
import { Link } from "react-router";
import Avatar from "./Avatar.jsx";
import LikeImage from "./LikeImage.jsx";

export default function PostCard({
  post,
  handleLikeUnlikeClick,
  alreadyLiked,
  currentUserPicture,
}) {
  const [likes, setLikes] = useState(post._count.likes);
  const [liked, setLiked] = useState(alreadyLiked);
  const [comments, setComments] = useState(post.comments);

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

  async function handleSubmitComment(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const postId = event.target.dataset.postid;
    const content = formData.get("content");
    const createComment = async () => {
      try {
        const endpoint = `${
          import.meta.env.VITE_API_URL
        }/posts/${postId}/comments`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        });
        const json = await res.json();
        if (json) {
          form.reset();
          setComments((prev) => [...prev, json.comment]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    createComment();
  }

  const postContent = post.content.trim();

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
          <p className="post-create-time">{post.createdAt}</p>
        </div>
        <form>
          <button
            className="like-button"
            type="button"
            onClick={handleClick}
            data-id={post.id}
            name={liked ? "unlike" : "like"}
            aria-label={`${likes} likes. Click to ${
              liked ? "unlike" : "like"
            }.`}
          >
            <LikeImage liked={liked} />
            {likes} like{likes === 1 ? null : "s"}
          </button>
        </form>
      </div>
      <div className="post-content">
        {postContent
          .split("\n")
          .map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
      </div>
      <hr />
      <div className="comments-container">
        <h5 className="comments-heading">Comments</h5>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserPicture={currentUserPicture}
            />
          ))
        ) : (
          <p>No comments yet...</p>
        )}
        <form
          className="comment-form"
          onSubmit={handleSubmitComment}
          method="post"
          data-postid={post.id}
        >
          <label className="sr-only" htmlFor={post.id}>
            Add a comment:
          </label>
          <input
            name="content"
            className="comment-input"
            id={post.id}
            type="text"
            placeholder="Add a comment (Enter to send)"
            required
          />
          <button
            className="button comment-submit"
            type="submit"
            aria-label="Submit Comment"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

function CommentCard({ comment, currentUserPicture }) {
  return (
    <div className="comment-card">
      <div className="comment-info-container">
        <Avatar
          picture={
            comment.author.picture?.split("?")[0] ===
            currentUserPicture?.split("?")[0]
              ? currentUserPicture
              : comment.author.picture
          }
        />

        <div className="comment-author-time">
          <Link
            to={`/profile/${comment.author.id}`}
            className="comment-author-name"
          >
            {comment.author.displayName}
          </Link>
          <p className="comment-create-time">{comment.createdAt}</p>
        </div>
      </div>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
}
