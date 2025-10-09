import { Outlet } from "react-router";
import "../styles/App.css";

export default function AuthPage() {
  return (
    <main className="auth-form-container ">
      <div className="auth-header">
        <img className="auth-icon" src="/spaces.svg" alt="spaces icon" />
        <h1 className="auth-heading"> Spaces</h1>
      </div>
      <p className="auth-description">Your space, your place.</p>
      <Outlet />
    </main>
  );
}
