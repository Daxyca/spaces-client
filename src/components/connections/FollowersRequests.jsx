import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function FollowersRequests() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  function handleButtonClick(event) {
    const button = event.currentTarget;
    const sendFollowRequest = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL + "/follow/" + button.dataset.id;
        const res = await fetch(endpoint, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
      } catch (err) {
        console.error(err);
      }
    };
    sendFollowRequest();
    button.disabled = true;
  }

  const profileKey = "follower";
  const buttonText = "Accept";

  return (
    <>
      <h3>Followers Requests ({data.follows.length})</h3>
      {data.follows.length > 0 ? (
        data.follows.map((follow) => (
          <ProfileCard
            key={follow[profileKey].id}
            profile={follow[profileKey]}
            buttonText={buttonText}
            handleButtonClick={handleButtonClick}
          />
        ))
      ) : (
        <p>Nothing to see here...</p>
      )}
    </>
  );
}
