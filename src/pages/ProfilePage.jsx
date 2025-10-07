import { useAuth } from "../contexts/AuthContext.js";
import { Outlet, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import { useProfile } from "../contexts/ProfileContext.js";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const { profile, setProfile } = useProfile();

  if (!profile || Object.keys(profile).length === 0) {
    return;
  }

  const isCurrentUser = !userId || userId === user.id;

  return <Outlet context={{ profile, setProfile, user, isCurrentUser }} />;
}
