import { useEffect, useState } from "react";
import { FeedsContext } from "./FeedsContext.js";
import { useAuth } from "./AuthContext.js";

export function FeedsProvider({ children }) {
  const { user } = useAuth();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function getFeeds() {
      const endpoint = import.meta.env.VITE_API_URL + "/feeds";
      const res = await fetch(endpoint, {
        credentials: "include",
      });
      const data = await res.json();
      setFeeds(data);
    }
    getFeeds();
  }, [user]);

  if (!user) {
    return children;
  }

  return <FeedsContext value={{ feeds, setFeeds }}>{children}</FeedsContext>;
}
