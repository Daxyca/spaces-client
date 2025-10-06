import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.js";
import Page from "./Page.jsx";
import { useLoaderData, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import ProfileContent from "../components/profile/ProfileContent.jsx";
import ProfileEdit from "../components/profile/ProfileEdit.jsx";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [mode, setMode] = useState("View"); // View or Edit
  const [profile, setProfile] = useState({});
  const data = useLoaderData();

  useEffect(() => {
    setProfile(data);
  }, [data]);

  if (!data || !user) {
    return;
  }

  const isCurrentUser = !userId || userId === user.id;

  return (
    <Page>
      {!user || !profile.id ? null : mode === "View" ? (
        <ProfileContent
          profile={profile}
          setMode={isCurrentUser ? setMode : () => {}}
          isCurrentUser={isCurrentUser}
        />
      ) : isCurrentUser && mode === "Edit" ? (
        <ProfileEdit
          profile={profile}
          setProfile={setProfile}
          setMode={setMode}
          user={user}
        />
      ) : null}
    </Page>
  );
}
