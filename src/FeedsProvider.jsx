import { useEffect, useState } from "react";
import { FeedsContext } from "./FeedsContext.js";

export function FeedsProvider({ children }) {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    async function getFeeds() {
      const endpoint = import.meta.env.VITE_API_URL + "/feeds";
      const res = await fetch(endpoint, {
        credentials: "include",
      });
      const data = await res.json();
      setFeeds(data);
    }
    getFeeds();
  }, []);

  return <FeedsContext value={{ feeds, setFeeds }}>{children}</FeedsContext>;
}
