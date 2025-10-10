import { useRef, useState } from "react";
import Avatar from "../Avatar.jsx";
import { Link } from "react-router";

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CommentCard({
  comment,
  currentUserPicture,
  userId,
  setComments,
}) {
  const menuEl = useRef();
  const [menuShown, setMenuShown] = useState(false);
  const pending = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const editCommentForm = useRef();
  const [errors, setErrors] = useState({});

  const commentCreatedAt = formatDate(comment.createdAt);

  const handleToggleCommentMenuClick = () => {
    setMenuShown((prev) => !prev);
  };

  const handleCommentMenuOnLeave = () => {
    setMenuShown(false);
  };

  const handleDeleteCommentSubmit = (event) => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setMenuShown(false);
    if (!confirm(`The comment will be deleted. Confirm?`)) {
      pending.current = false;
      return;
    }
    const deleteComment = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/comments/${
          comment.id
        }`;
        const res = await fetch(endpoint, {
          method: "DELETE",
          credentials: "include",
        });
        const json = await res.json();
        if (!json.error) {
          setComments((prevComments) =>
            prevComments.filter((prevComment) => prevComment.id !== comment.id)
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        pending.current = false;
      }
    };
    deleteComment();
  };

  const handleEditCommentClick = () => {
    setMenuShown(false);
    setIsEditing(true);
  };

  const handleCommentInputKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleCancelEditClick = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleEditCommentFormSubmit = (event) => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const form = event.target;
    const formData = new FormData(form);
    const content = formData.get("content").trim();
    const editComment = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL + "/comments/" + comment.id;
        const res = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        });
        const json = await res.json();
        if (!json.error) {
          setErrors({});
          setComments((prevComments) =>
            prevComments.map((prevComment) =>
              prevComment.id === json.id ? json : prevComment
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
      editComment();
    } else {
      pending.current = false;
      setErrors({ content: "Comment must not be empty or whitespaces only." });
    }
  };

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
          <p className="comment-create-time">{commentCreatedAt}</p>
        </div>
        {comment.authorId === userId ? (
          <div className="comment-menu" onMouseLeave={handleCommentMenuOnLeave}>
            <button
              onClick={handleToggleCommentMenuClick}
              className="comment-menu-toggle"
              aria-label="Toggle Comment Button"
            >
              ⋮
            </button>
            {menuShown && (
              <div className="comment-menu-options" ref={menuEl}>
                <button
                  className="edit-comment-button button"
                  to={`/comment/${comment.id}/edit`}
                  onClick={handleEditCommentClick}
                  autoFocus
                >
                  Edit<span className="sr-only"> Comment</span>
                </button>
                <form onSubmit={handleDeleteCommentSubmit} method="comment">
                  <button
                    className="delete-comment-button button accent"
                    type="submit"
                  >
                    Delete<span className="sr-only"> Comment</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : null}
      </div>
      {isEditing ? (
        <form
          className="edit-comment-form"
          ref={editCommentForm}
          onSubmit={handleEditCommentFormSubmit}
        >
          <label htmlFor={comment.id + "-content"} className="sr-only">
            Comment content:
          </label>
          <input
            name="content"
            id={comment.id + "-content"}
            className="edit-comment-content-input"
            defaultValue={comment.content}
            onKeyDown={handleCommentInputKeyDown}
            autoFocus
            required
          ></input>
          <div className="edit-comment-buttons-container">
            <span className="shortcut-key">↵</span>
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
        <p className="comment-content">{comment.content}</p>
      )}
    </div>
  );
}
