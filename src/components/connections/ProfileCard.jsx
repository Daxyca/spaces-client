import { Link } from "react-router";
import Avatar from "../Avatar.jsx";

export default function ProfileCard({
  profile,
  buttonText,
  secondButtonText,
  handleButtonClick,
  handleSecondButtonClick,
}) {
  const buttonClassName =
    "button" +
    (["Unfollow", "Cancel", "Remove"].includes(buttonText) ? " alt" : "");

  return (
    <div className="profile-card">
      <Avatar picture={profile.picture} />
      <Link to={`/profile/${profile.id}`}>{profile.displayName}</Link>
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
      {handleSecondButtonClick ? (
        <form>
          <button
            className={buttonClassName + " alt"}
            type="button"
            onClick={handleSecondButtonClick}
            data-id={profile.id}
          >
            {secondButtonText || "-"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
