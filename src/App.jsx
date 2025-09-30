import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/index.jsx";
import { useAuth } from "./AuthProvider.jsx";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

export default function App() {
  const { user, login, logout } = useAuth({});

  useEffect(() => {
    if (user || !localStorage.getItem("login")) {
      return;
    }
    const fetchUser = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/login";
        const res = await fetch(endpoint, {
          credentials: "include",
        });
        const json = await res.json();
        const refetchUser = json.data;
        if (!user && refetchUser) {
          login(refetchUser);
        } else if (!user) {
          logout();
        }
      } catch (err) {
        logout();
        console.error(err);
      }
    };
    fetchUser();
  }, [user]);

  return <RouterProvider router={router} />;
}
