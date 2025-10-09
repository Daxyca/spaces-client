import { Link, Navigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { useRef } from "react";
import { useFeeds } from "../contexts/FeedsContext.js";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <Link to="/">
        <img className="header-icon" src="/spaces.svg" alt="spaces icon" />
      </Link>
      <nav className="nav">
        <ul className="nav-list nav-center-list">
          <NavListItem href="/" name="Home" />
          <NavListCenter />
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

function NavListItem({ href = "/", name }) {
  return (
    <li className={"nav-item"}>
      <Link className="nav-link" to={href}>
        {name}
      </Link>
    </li>
  );
}

function NavListCenter() {
  const { feeds } = useFeeds();
  const { feedName } = useParams();
  const feedsEl = useRef();

  if (feedName && !feeds.map((feed) => feed.name).includes(feedName)) {
    return <Navigate to="/feeds" replace />;
  }

  const handleFeedsClick = (event) => {
    event.currentTarget.classList.toggle("show-feeds");
  };

  return (
    <>
      <li
        className="nav-item nav-feeds-item"
        ref={feedsEl}
        onClick={handleFeedsClick}
      >
        <p className="nav-link nav-toggle nav-feeds-toggle">Feeds</p>
        <Link className="nav-link nav-feed-link" to="/feeds">
          <span className="sr-only">View and </span>
          (Edit Feeds)
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
