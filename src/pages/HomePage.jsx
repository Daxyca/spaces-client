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
  }, [data]);

  if (!feeds) {
    return;
  } else if (feedName && !feeds.map((feed) => feed.name).includes(feedName)) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Page>
      <div className="main-container">
        <div className="left-container">
          <h3 className="feeds-heading">
            Feeds{" "}
            <Link
              to={`/edit/feeds${
                feedName ? `/${feedName}` : feeds[0] ? `/${feeds[0].name}` : ``
              }`}
            >
              Edit
            </Link>
          </h3>

          <Link to="/">Main Feed</Link>
          {feeds.map((feed) => (
            <Link key={feed.id} to={`/feeds/${feed.name}`}>
              {feed.name}
            </Link>
          ))}
        </div>
        <div className="right-container">
          <Outlet context={{ feedName }} />
        </div>
      </div>
    </Page>
  );
}
