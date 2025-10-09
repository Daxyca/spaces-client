import { Link, useNavigate } from "react-router";
import Socials from "./Socials.jsx";
import { useRef, useState } from "react";
import { parseValidationErrors } from "../../utils.js";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const pending = useRef();

  function handleRegisterSubmit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const register = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/register";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const json = await res.json();
        if (!json.error) {
          setErrors({});
          navigate("/auth/login");
        } else {
          pending.current = false;
          setErrors(parseValidationErrors(res.status, json));
        }
      } catch (err) {
        pending.current = false;
        console.error(err);
      }
    };
    register();
  }

  return (
    <>
      <form className="auth-form" onSubmit={handleRegisterSubmit} method="post">
        <label className="visually-hidden" htmlFor="username">
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
        <label className="visually-hidden" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
        <label className="visually-hidden" htmlFor="password">
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
          Register
        </button>
        {errors.unexpected && (
          <p className="field-error">{errors.unexpected}</p>
        )}
      </form>
      <Socials loginForm={false} />
      <p className="auth-link">
        Already registered?
        <Link to="/auth/login"> Login</Link>
      </p>
    </>
  );
}
