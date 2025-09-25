import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/index.jsx";
import { useAuth } from "./AuthProvider.jsx";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

export default function App() {
  const { user, login } = useAuth({});

  useEffect(() => {
    if (user) {
      return;
    }
    const fetchUser = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/login";
        const res = await fetch(endpoint, {
          credentials: "include",
        });
        const data = await res.json();
        login(data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return <RouterProvider router={router} />;
}
