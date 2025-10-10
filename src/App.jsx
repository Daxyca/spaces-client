import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/indexRoutes.jsx";
import { useAuth } from "./contexts/AuthContext.js";
import { useEffect } from "react";
import { SpacesProvider } from "./contexts/SpacesProvider.jsx";

const router = createBrowserRouter(routes);

export default function App() {
  const { user, login, logout } = useAuth({});

  useEffect(() => {
    if (user?.id || !localStorage.getItem("login")) {
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
        if (!user?.id && refetchUser) {
          login(refetchUser);
        } else if (!user?.id) {
          logout();
        }
      } catch (err) {
        logout();
        console.error(err);
      }
    };
    fetchUser();
  }, [user, login, logout]);

  return (
    <SpacesProvider>
      <RouterProvider router={router} />
    </SpacesProvider>
  );
}
