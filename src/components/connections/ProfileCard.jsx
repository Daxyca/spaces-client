export default function ProfileCard({ profile }) {
  return (
    <div className="profile-card">
      <p>{profile.displayName}</p>
      <form>
        <button type="button">Follow</button>
      </form>
    </div>
  );
}
