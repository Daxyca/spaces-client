import { Link, Navigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { useRef } from "react";
import { useFeeds } from "../contexts/FeedsContext.js";
import DownSymbol from "../assets/DownSymbol.jsx";

export default function Header() {
  const feedsNavList = useRef();
  const userNavList = useRef();

  return (
    <header className="header">
      <Link to="/">
        <img className="header-icon" src="/spaces.svg" alt="spaces icon" />
      </Link>
      <nav className="nav">
        <ul className="nav-list nav-center-list">
          <NavListItem href="/" name="Home" />
          <NavListCenter feedsNavlist={feedsNavList} />
          <NavListItem href="/connections" name="Connections" />
        </ul>
      </nav>
      <nav className="nav">
        <ul className="nav-list nav-user-list">
          <NavListRight userNavList={userNavList} />
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

function NavListCenter({ feedsNavlist }) {
  const { feeds } = useFeeds();
  const { feedName } = useParams();

  if (feedName && !feeds.map((feed) => feed.name).includes(feedName)) {
    return <Navigate to="/feeds" replace />;
  }

  const handleFeedsClick = (event) => {
    event.currentTarget.classList.toggle("show-list");
  };

  return (
    <>
      <li
        className="nav-item nav-feeds-item"
        ref={feedsNavlist}
        onClick={handleFeedsClick}
        onMouseLeave={() => feedsNavlist.current.classList.remove("show-list")}
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

function NavListRight({ userNavList }) {
  const { user } = useAuth();

  const handleFeedsClick = (event) => {
    event.currentTarget.classList.toggle("show-list");
  };

  return (
    <>
      <li
        className="nav-item nav-users-item"
        ref={userNavList}
        onClick={handleFeedsClick}
        onMouseLeave={() => userNavList.current.classList.remove("show-list")}
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
