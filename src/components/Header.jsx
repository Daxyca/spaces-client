import { Link, Navigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { useRef } from "react";
import { useSpaces } from "../contexts/SpacesContext.js";
import DownSymbol from "../assets/DownSymbol.jsx";

export default function Header() {
  const spacesNavList = useRef();
  const userNavList = useRef();

  return (
    <header className="header">
      <Link to="/">
        <img className="header-icon" src="/spaces.svg" alt="spaces icon" />
      </Link>
      <nav className="nav">
        <ul className="nav-list nav-center-list">
          <NavListItem href="/" name="Home" />
          <NavListCenter spacesNavlist={spacesNavList} />
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

function NavListCenter({ spacesNavlist }) {
  const { spaces } = useSpaces();
  const { spaceName } = useParams();

  if (spaceName && !spaces.map((space) => space.name).includes(spaceName)) {
    return <Navigate to="/spaces" replace />;
  }

  const handleSpacesClick = (event) => {
    event.currentTarget.classList.toggle("show-list");
  };

  return (
    <>
      <li
        className="nav-item nav-spaces-item"
        ref={spacesNavlist}
        onClick={handleSpacesClick}
        onMouseLeave={() => spacesNavlist.current.classList.remove("show-list")}
      >
        <p className="nav-link nav-toggle nav-spaces-toggle">
          Spaces <DownSymbol />
        </p>
        <Link className="nav-link nav-space-link" to="/spaces">
          <span className="sr-only">View and Edit </span>Spaces ✎
        </Link>
        {spaces.map((space) => (
          <Link
            key={space.id}
            className="nav-link nav-space-link"
            to={`/spaces/${space.name}/posts`}
          >
            <span className="sr-only">Your space named </span>
            {space.name}
          </Link>
        ))}
      </li>
    </>
  );
}

function NavListRight({ userNavList }) {
  const { user } = useAuth();

  const handleSpacesClick = (event) => {
    event.currentTarget.classList.toggle("show-list");
  };

  return (
    <>
      <li
        className="nav-item nav-users-item"
        ref={userNavList}
        onClick={handleSpacesClick}
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
