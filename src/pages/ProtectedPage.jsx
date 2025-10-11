import "../styles/App.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import RouteProgress from "../components/RouteProgress.jsx";

export default function ProtectedPage() {
  const { user } = useAuth();

  if (
    !localStorage.getItem("login") ||
    (!user?.id && !localStorage.getItem("login"))
  ) {
    return <Navigate to="/loading" replace />;
  }

  return (
    <>
      <Header />
      <RouteProgress />
      <main className="main">
        <Outlet context={{ user }} />
      </main>
      <Footer />
    </>
  );
}
