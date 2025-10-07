import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function PendingRequests() {
  const data = useLoaderData();

  if (!data) {
    return;
  }

  function handleCancelClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    button.disabled = true;
    const sendFollowRequest = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL +
          "/follow/following/" +
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
    sendFollowRequest();
  }

  const profileKey = "following";
  const buttonText = "Cancel";

  return (
    <>
      <h3>Pending Follow Requests ({data.follows.length})</h3>
      {data.follows.length > 0 ? (
        data.follows.map((follow) => (
          <ProfileCard
            key={follow[profileKey].id}
            profile={follow[profileKey]}
            buttonText={buttonText}
            handleButtonClick={handleCancelClick}
          />
        ))
      ) : (
        <p>Nothing to see here...</p>
      )}
    </>
  );
}
