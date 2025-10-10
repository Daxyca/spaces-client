import { Outlet } from "react-router";
import "../styles/App.css";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout;
    const checkServerHealth = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/health");
        const json = await res.json();
        if (!json.error) {
          setLoading(false);
          return;
        }
      } catch (err) {
        // ignore; server may still be starting
      }
      timeout = setTimeout(checkServerHealth, 5000);
    };
    checkServerHealth();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="auth-form-container">
      {loading ? (
        <p className="auth-server-loading-text">
          Server loading... Please wait.
        </p>
      ) : null}
      <div className="auth-header">
        <img className="auth-icon" src="/spaces.svg" alt="spaces icon" />
        <h1 className="auth-heading"> Spaces</h1>
      </div>
      <p className="auth-description">Your space, your place.</p>
      <Outlet />
    </main>
  );
}
