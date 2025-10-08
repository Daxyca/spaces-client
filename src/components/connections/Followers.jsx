import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";
import { useEffect, useState } from "react";

export default function Followers() {
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

  function handleRemoveClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    button.disabled = true;
    const removeFollower = async () => {
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
          button.disabled = false;
          throw new Error(json.error);
        }
        removeProfileId(button.dataset.id);
      } catch (err) {
        button.disabled = false;
        console.error(err);
      }
    };
    removeFollower();
  }

  const profileKey = "follower";
  const buttonText = "Remove";

  function removeProfileId(id) {
    setFollows((prevProfiles) =>
      prevProfiles.filter((profile) => profile[profileKey].id !== id)
    );
  }

  return (
    <>
      <h3>Followers ({follows.length})</h3>
      {follows.length > 0 ? (
        follows.map((follow) => (
          <ProfileCard
            key={follow[profileKey].id}
            profile={follow[profileKey]}
            buttonText={buttonText}
            handleButtonClick={handleRemoveClick}
          />
        ))
      ) : (
        <p>Nothing to see here...</p>
      )}
    </>
  );
}
