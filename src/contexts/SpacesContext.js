import { createContext, useContext } from "react";

export const SpacesContext = createContext({
  spaces: [],
  setSpaces: () => {},
});

export function useSpaces() {
  return useContext(SpacesContext);
}
