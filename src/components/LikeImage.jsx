import likedImage from "../assets/liked.svg";
import notLikedImage from "../assets/notLiked.svg";

export default function LikeImage({ liked = false }) {
  return (
    <div className="like-image-container">
      <img
        className="like-image"
        src={liked ? likedImage : notLikedImage}
        alt={liked ? "liked icon" : "not liked icon"}
      />
    </div>
  );
}
