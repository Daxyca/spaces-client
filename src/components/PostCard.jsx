import { useState } from "react";

export default function PostCard({
  post,
  handleLikeUnlikeClick,
  alreadyLiked,
}) {
  const [likes, setLikes] = useState(post._count.likes);
  const [liked, setLiked] = useState(alreadyLiked);

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

  return (
    <div className="post-card">
      <p>{post.author.displayName}</p>
      <p>{post.content}</p>
      <form>
        <button
          className="button alt"
          type="button"
          onClick={handleClick}
          data-id={post.id}
          name={liked ? "unlike" : "like"}
        >
          {likes} {liked ? "Unlike" : "Like"}
        </button>
      </form>
    </div>
  );
}
