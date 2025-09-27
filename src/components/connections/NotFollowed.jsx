import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function NotFollowed() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  return (
    <>
      <h3>Not Followed</h3>
      {data.profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </>
  );
}
