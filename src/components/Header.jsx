import { Link, Navigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { useRef } from "react";
import { useFeeds } from "../contexts/FeedsContext.js";

export default function Header() {
  const { user } = useAuth();
  const feedsEl = useRef();

  return (
    <header className="header">
      <Link to="/">
        <img className="header-icon" src="/spaces.svg" alt="spaces icon" />
      </Link>
      <nav className="nav">
        <ul className="nav-list nav-center-list">
          <NavListItem href="/" name="Home" />
          <NavListCenter ref={feedsEl} />
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
  const { feeds } = useFeeds();
  const { feedName } = useParams();

  if (feedName && !feeds.map((feed) => feed.name).includes(feedName)) {
    return <Navigate to="/feeds" replace />;
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
        {feeds.map((feed) => (
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
