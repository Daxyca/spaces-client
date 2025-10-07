import { Link, Navigate, useParams } from "react-router";
import { useAuth } from "../AuthContext.js";
import { useContext, useEffect, useRef, useState } from "react";
import { FeedsProvider } from "../FeedProvider.jsx";
import { FeedsContext } from "../FeedsContext.js";

export default function Header() {
  const { user } = useAuth();
  const feedsEl = useRef();

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header-icon"
          src="/spaces.svg"
          alt="spaces icon"
          width="32px"
        />
      </Link>
      <nav className="nav">
        <ul className="nav-list nav-center-list">
          <NavListItem href="/" name="Home" />
          <FeedsProvider>
            <NavListCenter ref={feedsEl} />
          </FeedsProvider>
          <NavListItem href="/connections" name="Connections" />
        </ul>
      </nav>
      <nav className="nav">
        <ul className="nav-list nav-user-list">
          <NavListItem href="/profile" name={user?.displayName || "User"} />
          <NavListItem href="/auth/logout" name="Logout" />
        </ul>
      </nav>
    </header>
  );
}

function NavListItem({ href = "/", name, ref }) {
  return (
    <li className={"nav-item" + (ref ? " nav-center" : "")} ref={ref}>
      <Link className="nav-link" to={href}>
        {name}
      </Link>
    </li>
  );
}

function NavListCenter({ ref }) {
  const { feeds } = useContext(FeedsContext);
  const { feedName } = useParams();
  const [latestFeeds, setLatestFeeds] = useState(feeds);

  useEffect(() => {
    setLatestFeeds(feeds);
  }, [feeds]);

  if (latestFeeds.length === 0) {
    return (
      <li className="nav-item nav-center-list-item" ref={ref}>
        <Link className="nav-link nav-center-main-link" to="/feeds">
          Feeds
        </Link>
      </li>
    );
  }

  console.log("feeds on header");
  console.log(latestFeeds);

  if (feedName && !latestFeeds.map((feed) => feed.name).includes(feedName)) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <li className="nav-item nav-feeds-item" ref={ref}>
        <Link className="nav-link nav-feeds-link" to="/feeds">
          <span className="sr-only">View and Edit List of </span>
          Feeds
        </Link>
        <Link className="nav-link nav-feed-link" to="/">
          Main Feed
        </Link>
        {latestFeeds.map((feed) => (
          <Link
            key={feed.id}
            className="nav-link nav-feed-link"
            to={`/feeds/${feed.name}/posts`}
          >
            <span className="sr-only">Your feed named </span>
            {feed.name}
          </Link>
        ))}
      </li>
    </>
  );
}
