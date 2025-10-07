export default function LikeImage({ liked = false }) {
  return (
    <div className="like-image-container">
      <img
        className="like-image"
        src={liked ? "/liked.svg" : "/notLiked.svg"}
        alt={liked ? "liked icon" : "not liked icon"}
      />
    </div>
  );
}
