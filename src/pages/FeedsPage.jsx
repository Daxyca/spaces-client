import { Link, Outlet, useLoaderData, useParams } from "react-router";
import Page from "./Page.jsx";
import { useEffect, useState } from "react";

export default function FeedsPage() {
  const data = useLoaderData(); // feeds
  const { feedName } = useParams();
  const [feeds, setFeeds] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setFeeds(data.feeds);
    if (!feedName) {
      return;
    }
    const currentFeeds = feeds.length > 0 ? feeds : data.feeds;
    const feedUsers = currentFeeds
      .filter((feed) => feed.name === feedName)[0]
      .users.map((user) => ({ ...user, isInFeed: true }));
    const feedUserIds = feedUsers.map((user) => user.id);
    const usersFollowed = data.follows
      .map((follow) => ({ ...follow.following, isInFeed: false }))
      .filter((user) => !feedUserIds.includes(user.id));
    setUsers([...feedUsers, ...usersFollowed]);
  }, [feedName]);

  if (!data) {
    return;
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

  return (
    <Page>
      <div className="main-container">
        <div className="left-container">
          <h3 className="feeds-heading">
            Feeds
            <Link to="/"> Done</Link>
          </h3>
          {feeds.map((feed) => (
            <Link key={feed.id} to={`/edit/feeds/${feed.name}`}>
              {feed.name}
            </Link>
          ))}
          <form name="create" onSubmit={handleCreateFeedSubmit} method="post">
            <input type="text" name="name" id="name" />
            <button className="button" type="submit">
              Create Feed
            </button>
          </form>
        </div>
        <div className="right-container">
          {feeds.length > 0 ? <Outlet context={{ users, feedName }} /> : ""}
        </div>
      </div>
    </Page>
  );
}
