import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}

export function useAuth() {
  return useContext(AuthContext);
}
