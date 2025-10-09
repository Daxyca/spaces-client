import { useEffect, useState } from "react";
import { SpacesContext } from "./SpacesContext.js";
import { useAuth } from "./AuthContext.js";

export function SpacesProvider({ children }) {
  const { user } = useAuth();
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function getSpaces() {
      const endpoint = import.meta.env.VITE_API_URL + "/spaces";
      const res = await fetch(endpoint, {
        credentials: "include",
      });
      const data = await res.json();
      setSpaces(data);
    }
    getSpaces();
  }, [user]);

  if (!user) {
    return children;
  }

  return (
    <SpacesContext value={{ spaces, setSpaces }}>{children}</SpacesContext>
  );
}
