import { Link, Navigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { useRef } from "react";
import { useFeeds } from "../contexts/FeedsContext.js";
import DownSymbol from "../assets/DownSymbol.jsx";

export default function Header() {
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
          <NavListRight />
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
        <p className="nav-link nav-toggle nav-feeds-toggle">
          Feeds <DownSymbol />
        </p>
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

function NavListRight() {
  const { user } = useAuth();
  const userEl = useRef();

  const handleFeedsClick = (event) => {
    event.currentTarget.classList.toggle("show-feeds");
  };

  return (
    <>
      <li
        className="nav-item nav-users-item"
        ref={userEl}
        onClick={handleFeedsClick}
      >
        <p className="nav-link nav-toggle nav-user-toggle">
          {user?.displayName || "User"} <DownSymbol />
        </p>
        <Link className="nav-link nav-user-link" to="/profile">
          Profile
        </Link>
        <Link className="nav-link nav-user-link" to="/auth/logout">
          Logout
        </Link>
      </li>
    </>
  );
}
