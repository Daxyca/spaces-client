import { createContext } from "react";

export const FeedsContext = createContext({
  feeds: [],
  setFeeds: () => {},
});
