import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function FollowersRequests() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  function handleAcceptClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    button.disabled = true;
    const sendFollowRequest = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL +
          "/follow/follower/" +
          button.dataset.id;
        const res = await fetch(endpoint, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.error) {
          button.disabled = false;
          throw new Error(json.error);
        }
      } catch (err) {
        console.error(err);
      }
    };
    sendFollowRequest();
  }

  function handleDeclineClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    button.disabled = true;
    const declineRequest = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL +
          "/follow/follower/" +
          button.dataset.id;
        const res = await fetch(endpoint, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.error) {
          button.disabled = false;
          throw new Error(json.error);
        }
      } catch (err) {
        console.error(err);
      }
    };
    declineRequest();
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
            secondButtonText={"Decline"}
            handleButtonClick={handleAcceptClick}
            handleSecondButtonClick={handleDeclineClick}
          />
        ))
      ) : (
        <p>Nothing to see here...</p>
      )}
    </>
  );
}
