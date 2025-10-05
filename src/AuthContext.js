import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: {},
});

export function useAuth() {
  return useContext(AuthContext);
}
