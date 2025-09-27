import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function Following() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  const profileKey = "following";
  const buttonText = "Unfollow";

  return (
    <>
      <h3>Following ({data.follows.length})</h3>
      {data.follows.map((follow) => (
        <ProfileCard
          key={follow[profileKey].id}
          profile={follow[profileKey]}
          buttonText={buttonText}
        />
      ))}
    </>
  );
}
