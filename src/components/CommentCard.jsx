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

export default function CommentCard({ comment, currentUserPicture }) {
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
