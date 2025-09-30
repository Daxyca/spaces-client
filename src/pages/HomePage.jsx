import { Link, Navigate, Outlet, useLoaderData, useParams } from "react-router";
import "../styles/HomePage.css";
import Page from "./Page.jsx";
import { useEffect, useState } from "react";

export default function HomePage() {
  const data = useLoaderData(); // feeds
  const { feedName } = useParams();
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    setFeeds(data);
  }, []);

  if (!feeds) {
    return;
  } else if (feedName && !feeds.map((feed) => feed.name).includes(feedName)) {
    return <Navigate to="/404" replace />;
  }

  const handleCreateFeedSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const createFeed = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/feeds";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name }),
        });
        const json = await res.json();
        console.log(json);
        if (json) {
          setFeeds((prevFeed) => [...prevFeed, json]);
          form.reset();
        }
      } catch (err) {
        console.error(err);
      }
    };
    createFeed();
  };

  return (
    <Page>
      <div className="home-main-container">
        <div className="home-left-container">
          <h3 className="feeds-heading">Feeds</h3>
          <Link to="/">Main Feed</Link>
          {feeds.map((feed) => (
            <Link key={feed.id} to={`/feeds/${feed.name}`}>
              {feed.name}
            </Link>
          ))}
          <form onSubmit={handleCreateFeedSubmit} method="post">
            <input type="text" name="name" id="name" />
            <button className="button" type="submit">
              Create Feed
            </button>
          </form>
        </div>
        <div className="home-right-container">
          <Outlet context={{ feedName }} />
        </div>
      </div>
    </Page>
  );
}
