import { Link, useNavigate } from "react-router";
import Socials from "./Socials.jsx";
import { useRef, useState } from "react";
import { parseValidationErrors } from "../../utils.js";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const pending = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  function handleRegisterSubmit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    setErrors({});
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      pending.current = false;
      return;
    }
    const register = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/register";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, confirmPassword }),
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

  const handlePasswordInput = () => {
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;
    if (confirmPassword === "" || password !== confirmPassword) {
      confirmPasswordInput.current.style.outline = "0.0625rem solid red";
      confirmPasswordInput.current.setCustomValidity(
        "Must be same as password."
      );
    } else {
      confirmPasswordInput.current.style.outline = "none";
      confirmPasswordInput.current.setCustomValidity("");
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleRegisterSubmit} method="post">
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
        <label className="sr-only" htmlFor="email">
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
          onInput={handlePasswordInput}
          ref={passwordInput}
          required
        />
        {errors.password && <p className="field-error">{errors.password}</p>}
        <label className="sr-only" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          minLength="3"
          maxLength="32"
          placeholder="Confirm Password"
          onInput={handlePasswordInput}
          ref={confirmPasswordInput}
          required
        />
        {errors.confirmPassword && (
          <p className="field-error">{errors.confirmPassword}</p>
        )}
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
