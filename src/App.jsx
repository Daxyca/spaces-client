import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/index.jsx";
import { useAuth } from "./AuthProvider.jsx";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

export default function App() {
  const { user, login } = useAuth({});

  useEffect(() => {
    if (!localStorage.getItem("login")) {
      return;
    }
    const fetchUser = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/login";
        const res = await fetch(endpoint, {
          credentials: "include",
        });
        if (!res.ok) {
          return null;
        }
        const json = await res.json();
        const refetchUser = json.data;
        if (!user && refetchUser) {
          login(refetchUser);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return <RouterProvider router={router} />;
}
