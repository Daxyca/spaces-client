import "../styles/AuthPage.css";
import Page from "./Page.jsx";
import { useAuth } from "../AuthProvider.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    } else {
      const submit = async () => {
        try {
          const endpoint = import.meta.env.VITE_API_URL + "/auth/logout";
          const res = await fetch(endpoint, {
            method: "DELETE",
            credentials: "include",
          });
          const data = await res.json();
          if (!data.logout) {
            console.log("Could not log out successfully on the server.");
          }
          logout();
        } catch (err) {
          console.error(err);
        }
      };
      if (user) {
        submit();
      }
    }
  }, [user]);

  return (
    <Page>
      <p>Logged out successfully!</p>
    </Page>
  );
}
