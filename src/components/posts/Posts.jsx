import { useLoaderData, useOutletContext, useParams } from "react-router";
import PostCard from "./PostCard.jsx";
import { useEffect, useRef, useState } from "react";
import { parseValidationErrors } from "../../utils.js";

export default function Posts() {
  const data = useLoaderData();
  const { user } = useOutletContext();
  const { spaceName } = useParams();
  const [errors, setErrors] = useState({});
  const [posts, setPosts] = useState([]);
  const pending = useRef();
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
    if (pending.current) return;
    pending.current = true;
    const form = event.target;
    const formData = new FormData(form);
    const content = formData.get("content").trim();
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
        if (!json.error) {
          setErrors({});
          const newPost = {
            ...json,
            _count: { likes: 0 },
            likes: [],
            comments: [],
          };
          setPosts((prevPosts) => [newPost, ...prevPosts]);
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
      createPost();
    } else {
      pending.current = false;
      setErrors({ content: "Post must not be empty or whitespaces only." });
    }
  };

  const handlePostInputKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      createPostForm.current.requestSubmit();
    }
  };

  return (
    <div className="posts-container">
      <h2 className="posts-heading sr-only">
        {spaceName ? `${spaceName} Posts` : "Main Space Posts"}
      </h2>
      <h3 id="create-post-heading" className="sr-only">
        Create a post
      </h3>
      {!spaceName ? (
        <>
          <form
            className="create-post-form"
            onSubmit={handlePostFormSubmit}
            method="post"
            ref={createPostForm}
            aria-labelledby="create-post-heading"
          >
            <label className="sr-only" htmlFor="post-content-input">
              Post content:
            </label>
            <textarea
              name="content"
              id="post-content-input"
              className="post-content-input"
              placeholder="Create a post (Ctrl + Enter ↵)"
              onKeyDown={handlePostInputKeyDown}
              maxLength="1000"
              required
            ></textarea>
            <button className="button post-submit-button" type="submit">
              Post
            </button>
          </form>
          {errors.content && <p className="field-error">{errors.content}</p>}
        </>
      ) : null}
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            post={post}
            key={post.id}
            alreadyLiked={post.likes.length > 0 ? true : false}
            handleLikeUnlikeClick={handleLikeUnlikeClick}
            setPosts={setPosts}
            userId={user.id}
          />
        ))
      ) : (
        <p style={{ alignSelf: "center" }}>No posts to see here...</p>
      )}
    </div>
  );
}
