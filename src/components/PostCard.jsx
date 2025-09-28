export default function PostCard({ post, handleLikeButtonClick }) {
  return (
    <div className="post-card">
      <p>{post.author.displayName}</p>
      <p>{post.content}</p>
      <form>
        <button type="button" onClick={handleLikeButtonClick} data-id={post.id}>
          Like
        </button>
      </form>
    </div>
  );
}
