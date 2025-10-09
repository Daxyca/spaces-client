import { useRef, useState } from "react";
import Avatar from "./Avatar.jsx";
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

export default function Comments({
  currentUserPicture,
  handleSubmitComment,
  post,
}) {
  const [comments, setComments] = useState(post.comments);
  const [errors, setErrors] = useState({});
  const pending = useRef();

  async function handleSubmitComment(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const form = event.target;
    const formData = new FormData(form);
    const content = formData.get("content").trim();
    const createComment = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/posts/${
          post.id
        }/comments`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        });
        const json = await res.json();
        if (!json.error) {
          setErrors({});
          setComments((prev) => [...prev, json]);
          form.reset();
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
      createComment();
    } else {
      setErrors({ content: "Comment must not be empty or whitespaces only." });
    }
  }

  return (
    <div className="comments-container">
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
      >
        <label className="sr-only" htmlFor={post.id + "-comment"}>
          Add a comment:
        </label>
        <input
          name="content"
          className="comment-input"
          id={post.id + "-comment"}
          type="text"
          placeholder="Add a comment (Enter ↵)"
          maxLength="250"
          required
        />
        <button
          className="button comment-submit-button"
          type="submit"
          aria-label="Submit Comment"
        >
          Comment
        </button>
      </form>
      {errors.content && <p className="field-error">{errors.content}</p>}
    </div>
  );
}

function CommentCard({ comment, currentUserPicture }) {
  const commentCreatedAt = formatDate(comment.createdAt);

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
      </div>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
}
