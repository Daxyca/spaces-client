import { Link } from "react-router";
import { useAuth } from "../AuthProvider.jsx";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <h1 className="header-heading">
        <Link to="/">Spaces</Link>
      </h1>
      {user ? (
        <nav className="nav">
          <ul className="nav-list">
            <NavListItem href="/" name="Home" />
            <NavListItem href="/feeds" name="Feeds" />
            <NavListItem href="/connections" name="Connections" />
          </ul>
        </nav>
      ) : null}
      {user ? (
        <nav className="nav">
          <ul className="nav-list">
            <NavListItem href="/profile" name={user.displayName} />
            <NavListItem href="/auth/logout" name="Logout" />
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function NavListItem({ href = "/", name }) {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={href}>
        {name}
      </Link>
    </li>
  );
}
