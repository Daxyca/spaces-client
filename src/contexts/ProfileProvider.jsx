import { useEffect, useState } from "react";
import { ProfileContext } from "./ProfileContext.js";
import { useParams } from "react-router";

export function ProfileProvider({ children }) {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      const endpoint =
        import.meta.env.VITE_API_URL +
        "/profile" +
        (userId ? `/${userId}` : "");
      const res = await fetch(endpoint, { credentials: "include" });
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
  }, [userId]);

  return (
    <ProfileContext value={{ profile, setProfile }}>{children}</ProfileContext>
  );
}
