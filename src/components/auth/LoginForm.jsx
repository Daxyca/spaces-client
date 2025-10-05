import { useAuth } from "../../AuthProvider.jsx";
import { Link, useNavigate } from "react-router";

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

  const handleGithubFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("login", "true");
    event.target.submit();
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLoginSubmit} method="post">
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            minLength="3"
            placeholder="Username"
            required
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            minLength="3"
            placeholder="Password"
            required
          />
        </label>
        <button className="button accent" type="submit">
          Login
        </button>
      </form>
      <p>
        <Link to="/auth/register">Create a new account</Link>
      </p>
      <form
        className="auth-form"
        action={import.meta.env.VITE_API_URL + "/auth/github"}
        onSubmit={handleGithubFormSubmit}
        method="get"
      >
        <button type="submit">Login with Github</button>
      </form>
    </>
  );
}
