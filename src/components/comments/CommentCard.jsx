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
      <p className="comment-content">{comment.content}</p>
    </div>
  );
}
