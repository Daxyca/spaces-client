import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import Page from "./Page.jsx";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  console.log({ user });
  const [profile, setProfile] = useState({});
  const data = useLoaderData();

  useEffect(() => {
    setProfile(data);
  }, [data]);

  if (!data || !profile || Object.keys(profile).length === 0 || !user) {
    return;
  }

  const isCurrentUser = !userId || userId === user.id;

  return (
    <Page>
      <Outlet context={{ profile, setProfile, user, isCurrentUser }} />
    </Page>
  );
}
