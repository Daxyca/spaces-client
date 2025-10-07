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
    setProfile(profile);
  }, [profile]);

  if (Object.keys(profile) === 0) {
    setProfile(data);
    return;
  }

  const isCurrentUser = !userId || userId === user.id;

  return (
    <Page>
      <Outlet
        context={{ profile: data, setProfile, user, isCurrentUser }}
      ></Outlet>
    </Page>
  );
}
