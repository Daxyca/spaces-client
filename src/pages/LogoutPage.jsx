import "../styles/AuthPage.css";
import Page from "./Page.jsx";
import { useAuth } from "../AuthContext.js";
import { useEffect } from "react";
import { Navigate } from "react-router";

export default function LoginPage() {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    const submit = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/logout";
        const res = await fetch(endpoint, {
          method: "DELETE",
          credentials: "include",
        });
        const json = await res.json();
        if (json.error) {
          throw new Error(json.error.message);
        }
        logout();
      } catch (err) {
        console.error(err);
      }
    };
    submit();
  }, [user, logout]);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Page>
      <p>Logging out...</p>
    </Page>
  );
}
