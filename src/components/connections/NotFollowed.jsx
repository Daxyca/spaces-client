import { useLoaderData } from "react-router";
import ProfileCard from "./ProfileCard.jsx";

export default function NotFollowed() {
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
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        console.log(json);
      } catch (err) {
        console.error(err);
      }
    };
    sendFollowRequest();
    button.disabled = true;
  }

  const buttonText = "Follow";

  return (
    <>
      <h3>Not Followed</h3>
      {data.profiles.length > 0 ? (
        data.profiles.map((profile) => (
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
