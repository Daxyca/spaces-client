import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.js";
import Page from "./Page.jsx";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
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
      <Outlet context={{ profile, setProfile, user, isCurrentUser }}></Outlet>
      {/* {!user || !profile.id ? null : mode === "View" ? (
        <ProfileContent profile={profile} isCurrentUser={isCurrentUser} />
      ) : isCurrentUser && mode === "Edit" ? (
        <ProfileEdit profile={profile} setProfile={setProfile} user={user} />
      ) : null} */}
    </Page>
  );
}
