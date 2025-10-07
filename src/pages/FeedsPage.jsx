import { Link, Navigate, Outlet, useLoaderData, useParams } from "react-router";
import Page from "./Page.jsx";
import { useContext, useEffect, useState } from "react";
import "../styles/FeedsPage.css";
import { FeedsContext } from "../FeedsContext.js";

export default function FeedsPage() {
  const data = useLoaderData(); // follows
  let { feedName } = useParams();
  const { feeds, setFeeds } = useContext(FeedsContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (feeds.length === 0 || !feedName) {
      return;
    }

    // Filter for the current feed
    const filteredFeeds = feeds.filter((feed) => feed.name === feedName)[0];
    if (filteredFeeds.length === 0) {
      return;
    }

    // Group users included in the feed first
    const feedUsers = filteredFeeds.users.map((user) => ({
      ...user,
      isInFeed: true,
    }));

    // Group followed users not included in the feed
    const feedUserIds = feedUsers.map((user) => user.id);
    const usersFollowed = data.follows
      .map((follow) => ({ ...follow.following, isInFeed: false }))
      .filter((user) => !feedUserIds.includes(user.id));

    // Set users
    setUsers([...feedUsers, ...usersFollowed]);
  }, [data, feedName, feeds]);

  if (!data) {
    return <Page></Page>;
  }

  if (!feedName && feeds.length > 0) {
    return <Navigate to={`/feeds/${feeds[0].name}/edit`} replace />;
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
        if (json.error) {
          throw Error(json.error.message);
        }
        if (json) {
          data.feeds.push(json);
          setFeeds((prevFeed) => [...prevFeed]);
          form.reset();
        }
      } catch (err) {
        console.error(err);
      }
    };
    createFeed();
  };

  const inFeed = users.reduce(
    (obj, user) => ((obj[user.id] = user.isInFeed), obj),
    {}
  );

  return (
    <Page>
      <div className="feeds-main-container">
        <div className="feeds-left-container">
          <h3 className="feeds-heading">Feeds List</h3>
          <ul className="feeds-list">
            {feeds.map((feed) => (
              <li key={feed.id} className="feeds-list-item">
                <Link key={feed.id} to={`/feeds/${feed.name}/edit`}>
                  {feed.name}
                </Link>
              </li>
            ))}
          </ul>
          <hr />
          <form
            className="create-feed-form"
            name="create"
            onSubmit={handleCreateFeedSubmit}
            method="post"
          >
            <input
              className="feed-name-input"
              type="text"
              name="name"
              id="name"
              placeholder="Feed name"
              minLength={3}
              maxLength={12}
              required
            />
            <button className="button create-feed-button" type="submit">
              Create Feed
            </button>
          </form>
        </div>
        <div className="feeds-right-container">
          {feeds.length > 0 ? (
            <Outlet context={{ users, feedName, inFeed }} />
          ) : (
            "No feeds created. Create a feed first."
          )}
        </div>
      </div>
    </Page>
  );
}
