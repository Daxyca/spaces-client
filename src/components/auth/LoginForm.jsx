import { useAuth } from "../../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router";
import Socials from "./Socials.jsx";
import { useRef, useState } from "react";
import { parseValidationErrors } from "../../utils.js";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const pending = useRef();

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
        setErrors({});
        login(json.data);
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        pending.current = false;
        setErrors(parseValidationErrors(res.status, json));
      }
    } catch (err) {
      pending.current = false;
      console.error(err);
    }
  };

  function handleLoginSubmit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    loginPost(username, password);
  }

  const handleGuestLoginSubmit = (event) => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    loginPost("user", "123");
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLoginSubmit} method="post">
        <label className="sr-only" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          minLength="3"
          maxLength="16"
          placeholder="Username"
          required
        />
        {errors.username && <p className="field-error">{errors.username}</p>}
        <label className="sr-only" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          minLength="3"
          maxLength="32"
          placeholder="Password"
          required
        />
        {errors.password && <p className="field-error">{errors.password}</p>}
        <button className="button" type="submit">
          Login
        </button>
        {errors.unexpected && (
          <p className="field-error">{errors.unexpected}</p>
        )}
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
      <p className="auth-link">
        No account?
        <Link to="/auth/register"> Register here</Link>
      </p>
    </>
  );
}
