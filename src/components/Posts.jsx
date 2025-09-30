import { useLoaderData, useOutletContext } from "react-router";
import PostCard from "../components/PostCard.jsx";
import { useEffect, useState } from "react";

export default function Posts() {
  const data = useLoaderData();
  const { feedName } = useOutletContext();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  if (!posts) {
    return;
  }

  if (data.length === 0) {
    return (
      <>
        <h3 className="posts-heading">
          {feedName ? `${feedName} ` : null} Posts
        </h3>
        <p>No posts to see here...</p>
      </>
    );
  }

  const handleLikeUnlikeClick = async (event, liked) => {
    const likeBtn = event.currentTarget;
    const postId = likeBtn.dataset.id;
    const likePost = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/posts/${postId}/like`;
        const res = await fetch(endpoint, {
          method: liked ? "DELETE" : "POST",
          credentials: "include",
        });
        const json = await res.json();
        if (json.like || json.unlike) {
          return json;
        }
      } catch (err) {
        console.error(err);
      }
    };
    return await likePost();
  };

  const handlePostFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const content = formData.get("content");
    const createPost = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/posts";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        });
        const json = await res.json();
        if (json) {
          const newPost = {
            ...json,
            _count: { likes: 0 },
            likes: [],
            comments: [],
          };
          setPosts((prevPosts) => [newPost, ...prevPosts]);
          form.reset();
        }
      } catch (err) {
        console.error(err);
      }
    };
    createPost();
  };

  return (
    <>
      <h3 className="posts-heading">{feedName ? `${feedName} ` : null}Posts</h3>
      {!feedName ? (
        <form
          className="create-post-form"
          onSubmit={handlePostFormSubmit}
          method="post"
        >
          <h3 className="home-heading">Create Post</h3>
          <textarea
            name="content"
            id="post-content"
            cols={50}
            placeholder="Create a post..."
            required
          ></textarea>
          <button className="button" type="submit">
            Post
          </button>
        </form>
      ) : null}
      {posts.map((post) => (
        <PostCard
          post={post}
          key={post.id}
          alreadyLiked={post.likes.length > 0 ? true : false}
          handleLikeUnlikeClick={handleLikeUnlikeClick}
        />
      ))}
    </>
  );
}
