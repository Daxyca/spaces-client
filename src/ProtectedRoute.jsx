import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user && !localStorage.getItem("login")) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
