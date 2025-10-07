import { createContext, useContext } from "react";

export const FeedsContext = createContext({
  feeds: [],
  setFeeds: () => {},
});

export function useFeeds() {
  return useContext(FeedsContext);
}
