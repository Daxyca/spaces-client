import Image from "../Image.jsx";

export default function ProfileCard({
  profile,
  buttonText,
  handleButtonClick,
}) {
  const buttonClassName =
    "button" +
    (["Unfollow", "Cancel", "Remove"].includes(buttonText) ? " accent" : "");

  return (
    <div className="profile-card">
      <Image picture={profile.picture} />
      <p>{profile.displayName}</p>
      <form>
        <button
          className={buttonClassName}
          type="button"
          onClick={handleButtonClick}
          data-id={profile.id}
        >
          {buttonText || "-"}
        </button>
      </form>
    </div>
  );
}
