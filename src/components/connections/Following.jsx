import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";
import { useEffect, useState } from "react";

export default function Following() {
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

  function handleUnfollowClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    button.disabled = true;
    const unfollow = async () => {
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
        removeProfileId(button.dataset.id);
      } catch (err) {
        button.disabled = false;
        console.error(err);
      }
    };
    unfollow();
  }

  const profileKey = "following";
  const buttonText = "Unfollow";

  function removeProfileId(id) {
    setFollows((prevProfiles) =>
      prevProfiles.filter((profile) => profile[profileKey].id !== id)
    );
  }

  return (
    <>
      <h3>Following ({follows.length})</h3>
      {follows.length > 0 ? (
        follows.map((follow) => (
          <ProfileCard
            key={follow[profileKey].id}
            profile={follow[profileKey]}
            buttonText={buttonText}
            handleButtonClick={handleUnfollowClick}
          />
        ))
      ) : (
        <p>Nothing to see here...</p>
      )}
    </>
  );
}
