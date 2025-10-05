import { useAuth } from "../../AuthProvider.jsx";
import { Link, useNavigate } from "react-router";
import Socials from "./Socials.jsx";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const submit = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/login";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        });
        const json = await res.json();
        if (json) {
          login(json.data);
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      }
    };
    submit();
  }

  return (
    <>
      <form className="auth-form" onSubmit={handleLoginSubmit} method="post">
        <label className="visually-hidden" htmlFor="username">
          Username:{" "}
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
          Password:{" "}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          minLength="3"
          placeholder="Password"
          required
        />
        <button className="button alt" type="submit">
          Login
        </button>
      </form>
      <Socials loginForm={true} />
      <p>
        <Link to="/auth/register">Create a new account</Link>
      </p>
    </>
  );
}
