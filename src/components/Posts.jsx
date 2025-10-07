import { useLoaderData, useParams } from "react-router";
import PostCard from "../components/PostCard.jsx";
import { useEffect, useRef, useState } from "react";

export default function Posts() {
  const data = useLoaderData();
  const { feedName } = useParams();

  const [posts, setPosts] = useState([]);
  const createPostForm = useRef();

  useEffect(() => {
    if (!data || data.error) {
      return;
    }
    setPosts(data);
  }, [data]);

  if (!posts) {
    return;
  }

  if (data.length === 0) {
    return (
      <div className="posts-container">
        <h2 className="posts-heading visually-hidden">
          {feedName ? `${feedName} ` : null} Posts
        </h2>
        <p>No posts to see here...</p>
      </div>
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

  const handlePostInputKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      createPostForm.current.requestSubmit();
    }
  };

  return (
    <div className="posts-container">
      <h2 className="posts-heading visually-hidden">
        {feedName ? `${feedName} Posts` : "Main Feed Posts"}
      </h2>
      <h3 id="create-post-heading" className="visually-hidden">
        Create a post
      </h3>
      {!feedName ? (
        <form
          className="create-post-form"
          onSubmit={handlePostFormSubmit}
          method="post"
          ref={createPostForm}
          aria-labelledby="create-post-heading"
        >
          <label className="visually-hidden" htmlFor="post-content-input">
            Post content:
          </label>
          <textarea
            name="content"
            id="post-content-input"
            className="post-content-input"
            placeholder="Create a post (Ctrl + Enter to post)"
            onKeyDown={handlePostInputKeyDown}
            required
          ></textarea>
          <button className="button post-submit-button" type="submit">
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
    </div>
  );
}
