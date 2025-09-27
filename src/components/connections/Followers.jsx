import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function Followers() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  const profileKey = "follower";

  return (
    <>
      <h3>Followers ({data.follows.length})</h3>
      {data.follows.map((follow) => (
        <ProfileCard key={follow[profileKey].id} profile={follow[profileKey]} />
      ))}
    </>
  );
}
