import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import Page from "./Page.jsx";

export default function ProtectedPage() {
  const { user } = useAuth();

  if (
    !localStorage.getItem("login") ||
    (!user && !localStorage.getItem("login"))
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Page>
      <Outlet />
    </Page>
  );
}
