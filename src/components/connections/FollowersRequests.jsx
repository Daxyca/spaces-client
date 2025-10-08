import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";
import { useEffect, useState } from "react";

export default function FollowersRequests() {
  const data = useLoaderData();
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    if (data.follows) {
      setFollows(data.follows);
    }
  }, [data]);

  if (!data) {
    return;
  }

  let blockClick = false;

  function handleAcceptClick(event) {
    event.preventDefault();
    if (blockClick) {
      return;
    }
    blockClick = true;
    const button = event.currentTarget;
    button.disabled = true;
    const sendFollowRequest = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL +
          "/follow/followers/" +
          button.dataset.id;
        const res = await fetch(endpoint, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.error) {
          blockClick = false;
          button.disabled = false;
          throw new Error(json.error);
        }
        removeProfileId(button.dataset.id);
      } catch (err) {
        blockClick = false;
        button.disabled = false;
        console.error(err);
      }
    };
    sendFollowRequest();
  }

  function handleDeclineClick(event) {
    event.preventDefault();
    if (blockClick) {
      return;
    }
    blockClick = true;
    const button = event.currentTarget;
    button.disabled = true;
    const declineRequest = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL +
          "/follow/followers/" +
          button.dataset.id;
        const res = await fetch(endpoint, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.error) {
          blockClick = false;
          button.disabled = false;
          throw new Error(json.error);
        }
        removeProfileId(button.dataset.id);
      } catch (err) {
        blockClick = false;
        button.disabled = false;
        console.error(err);
      }
    };
    declineRequest();
  }

  const profileKey = "follower";
  const buttonText = "Accept";

  function removeProfileId(id) {
    setFollows((prevProfiles) =>
      prevProfiles.filter((profile) => profile[profileKey].id !== id)
    );
  }

  return (
    <>
      <h3>Followers Requests ({follows.length})</h3>
      {follows.length > 0 ? (
        follows.map((follow) => (
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
