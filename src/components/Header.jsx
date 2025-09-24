import { Link } from "react-router";
import { useAuth } from "../AuthProvider.jsx";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="header">
      <h1 className="header-heading">
        <Link to="/">D Mailer</Link>
      </h1>
      <nav className="nav">
        <ul className="nav-list">
          <NavListItem href="/" name="Home" />
          {user ? (
            <>
              <NavListItem href="/profile" name={user.username} />
              <NavListItem href="/logout" name="Logout" />
            </>
          ) : (
            <>
              <NavListItem href="/register" name="Register" />
              <NavListItem href="/login" name="Login" />
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
