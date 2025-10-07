import { createContext, useContext } from "react";

export const ProfileContext = createContext({
  profile: [],
  setProfile: () => {},
});

export function useProfile() {
  return useContext(ProfileContext);
}
