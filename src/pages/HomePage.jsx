import { useLoaderData } from "react-router";
import "../styles/HomePage.css";
import Page from "./Page.jsx";
import PostCard from "../components/PostCard.jsx";

export default function HomePage() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  const handleLikeButtonClick = (event) => {};

  return (
    <Page>
      <h2 className="home-heading">Posts</h2>
      {data.posts.map((post) => (
        <PostCard
          post={post}
          key={post.id}
          handleLikeButtonClick={handleLikeButtonClick}
        />
      ))}
    </Page>
  );
}
