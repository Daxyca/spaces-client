import { Link } from "react-router";
import { useAuth } from "../AuthProvider.jsx";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="header">
      <h1 className="header-heading">
        <Link to="/">Spaces</Link>
      </h1>
      <nav className="nav">
        <ul className="nav-list">
          {user ? (
            <>
              <NavListItem href="/" name="Home" />
              <NavListItem href="/connections" name="Connections" />
              <NavListItem href="/profile" name={user.displayName} />
              <NavListItem href="/logout" name="Logout" />
            </>
          ) : (
            <>
              <NavListItem href="/auth/register" name="Register" />
              <NavListItem href="/auth/login" name="Login" />
            </>
          )}
        </ul>
      </nav>
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
