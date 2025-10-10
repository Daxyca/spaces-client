import "../styles/App.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

export default function ProtectedPage() {
  const { user } = useAuth();

  if (
    !localStorage.getItem("login") ||
    (!user && !localStorage.getItem("login"))
  ) {
    return <Navigate to="/loading" replace />;
  }

  return (
    <>
      <Header />
      <main className="main">
        <Outlet context={{ user }} />
      </main>
      <Footer />
    </>
  );
}
