import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function PendingRequests() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  const profileKey = "following";
  const buttonText = "Cancel";

  return (
    <>
      <h3>Pending Requests ({data.follows.length})</h3>
      {data.follows.length > 0 ? (
        data.follows.map((follow) => (
          <ProfileCard
            key={follow[profileKey].id}
            profile={follow[profileKey]}
            buttonText={buttonText}
          />
        ))
      ) : (
        <p>Nothing to see here...</p>
      )}
    </>
  );
}
