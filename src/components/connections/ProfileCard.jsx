export default function ProfileCard({
  profile,
  buttonText,
  handleButtonClick,
}) {
  return (
    <div className="profile-card">
      <p>{profile.displayName}</p>
      <form>
        <button type="button" onClick={handleButtonClick} data-id={profile.id}>
          {buttonText || "-"}
        </button>
      </form>
    </div>
  );
}
