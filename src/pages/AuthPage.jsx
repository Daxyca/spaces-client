import { Outlet } from "react-router";
import "../styles/App.css";

export default function AuthPage() {
  return (
    <main className="auth-form-container ">
      <h1 className="auth-heading">Spaces</h1>
      <p className="auth-description">Your space, your place.</p>
      <Outlet />
    </main>
  );
}
