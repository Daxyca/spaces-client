import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";
import { useEffect, useState } from "react";

export default function NotFollowed() {
  const data = useLoaderData();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (data.profiles) {
      setProfiles(data.profiles);
    }
  }, [data]);

  if (!data) {
    return;
  }

  function handleButtonClick(event) {
    const button = event.currentTarget;
    button.disabled = true;
    const sendFollowRequest = async () => {
      try {
        const endpoint =
          import.meta.env.VITE_API_URL +
          "/follow/following/" +
          button.dataset.id;
        const res = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.error) {
            button.disabled = false;
            throw new Error(json.error);
          }
          removeProfileId(button.dataset.id);
        } else {
          button.disabled = false;
        }
      } catch (err) {
        button.disabled = false;
        console.error(err);
      }
    };
    sendFollowRequest();
  }

  const buttonText = "Follow";

  function removeProfileId(id) {
    setProfiles((prevProfiles) =>
      prevProfiles.filter((profile) => profile.id !== id)
    );
  }

  return (
    <>
      <h3>Not Followed Users</h3>
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
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
