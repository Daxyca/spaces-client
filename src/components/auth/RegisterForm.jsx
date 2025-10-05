import { Link, useNavigate } from "react-router";

export default function RegisterForm() {
  const navigate = useNavigate();

  function handleRegisterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const submit = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/register";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const json = await res.json();
        if (json) {
          navigate("/auth/login");
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
      <form className="auth-form" onSubmit={handleRegisterSubmit} method="post">
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
        <label className="visually-hidden" htmlFor="email">
          Email:{" "}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
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
        <button className="button accent" type="submit">
          Register
        </button>
      </form>
      <p>
        <Link to="/auth/login">Already have an account?</Link>
      </p>
      <form
        className="auth-form"
        action={import.meta.env.VITE_API_URL + "/auth/github"}
        onSubmit={handleGithubFormSubmit}
        method="get"
      >
        <button type="submit">Sign up with Github</button>
      </form>
    </>
  );
}
