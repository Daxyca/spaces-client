import defaultAvatar from "../assets/default.jpg";

export default function Avatar({ picture, alt = "avatar" }) {
  return (
    <div className="avatar-container">
      <img src={picture ? picture : defaultAvatar} alt={alt} />
    </div>
  );
}
