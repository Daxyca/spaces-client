import { Link, Outlet, useLoaderData, useParams } from "react-router";
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
  }

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
        </div>
        <div className="home-right-container">
          <Outlet context={{ feedName }} />
        </div>
      </div>
    </Page>
  );
}
