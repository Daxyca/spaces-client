import { useAuth } from "../../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router";
import Socials from "./Socials.jsx";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginPost = async (username, password) => {
    try {
      const endpoint = import.meta.env.VITE_API_URL + "/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!json.error) {
        login(json.data);
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function handleLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    loginPost(username, password);
  }

  const handleGuestLoginSubmit = (event) => {
    event.preventDefault();
    loginPost("user", "123");
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLoginSubmit} method="post">
        <label className="visually-hidden" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          minLength="3"
          placeholder="Username"
          required
        />
        <label className="visually-hidden" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          minLength="3"
          placeholder="Password"
          required
        />
        <button className="button" type="submit">
          Login
        </button>
      </form>
      <form
        className="auth-form guest-login-form"
        action={import.meta.env.VITE_API_URL + "/auth/login"}
        onSubmit={handleGuestLoginSubmit}
        method="get"
      >
        <button className="button alt" type="submit">
          Guest Login
        </button>
      </form>
      <Socials loginForm={true} />
      <p>
        <Link to="/auth/register">Create a new account</Link>
      </p>
    </>
  );
}
