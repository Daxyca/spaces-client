import { useAuth } from "../contexts/AuthContext.js";
import { Outlet, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import { Loading } from "../components/Loading.jsx";
import { ProfileProvider } from "../contexts/ProfileProvider.jsx";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();

  if (!user?.id) {
    return <Loading />;
  }

  const isCurrentUser = !userId || userId === user?.id;

  return (
    <ProfileProvider>
      <Outlet context={{ user, isCurrentUser }} />
    </ProfileProvider>
  );
}
