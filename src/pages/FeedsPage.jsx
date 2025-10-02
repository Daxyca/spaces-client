import { Link, Outlet, useLoaderData, useParams } from "react-router";
import Page from "./Page.jsx";
import { useEffect, useRef, useState } from "react";

export default function FeedsPage() {
  const data = useLoaderData(); // feeds
  const { feedName } = useParams();
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    setFeeds(data);
    if (data.length > 0) {
      feedName;
    }
  }, [data]);

  if (!feeds) {
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

  const handleSaveFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();
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
          <h3>
            {feedName ? feedName : "Nothing to see here... Create a feed."}
          </h3>
          <form name="save" onSubmit={handleSaveFormSubmit} method="post">
            <button name="save" type="submit">
              Save
            </button>
          </form>
          <form name="delete" onSubmit={handleDeleteFormSubmit} method="post">
            <button name="delete" type="submit">
              Delete
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}
