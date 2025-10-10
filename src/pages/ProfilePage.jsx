import { useAuth } from "../contexts/AuthContext.js";
import { Outlet, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import { useProfile } from "../contexts/ProfileContext.js";
import { Loading } from "../components/Loading.jsx";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const { profile, setProfile } = useProfile();

  if (!profile || Object.keys(profile).length === 0 || !user?.id) {
    return <Loading />;
  }

  const isCurrentUser = !userId || userId === user?.id;

  return <Outlet context={{ profile, setProfile, user, isCurrentUser }} />;
}
