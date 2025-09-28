import { useLoaderData } from "react-router";
import "../styles/HomePage.css";
import Page from "./Page.jsx";
import PostCard from "../components/PostCard.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider.jsx";

export default function HomePage() {
  const { user } = useAuth();
  const data = useLoaderData();
  const [posts, setPosts] = useState();

  useEffect(() => {
    setPosts(data.posts);
  }, []);

  if (!posts) {
    return;
  }

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
          form.reset();
          setPosts((prev) => [
            {
              content,
              id: prev.length,
              author: { displayName: user.displayName },
              _count: { likes: 0 },
            },
            ...prev,
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    createPost();
  };

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

  return (
    <Page>
      <h2 className="home-heading">Posts</h2>
      <form onSubmit={handlePostFormSubmit} method="post">
        <h3>Create Post</h3>
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
      <h3>Feed</h3>
      {posts.map((post) => (
        <PostCard
          post={post}
          key={post.id}
          alreadyLiked={post.likes.length > 0 ? true : false}
          handleLikeUnlikeClick={handleLikeUnlikeClick}
        />
      ))}
    </Page>
  );
}
