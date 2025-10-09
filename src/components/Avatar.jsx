export default function Avatar({ picture, alt = "avatar" }) {
  return (
    <div className="avatar-container">
      <img src={picture ? picture : "/default.jpg"} alt={alt} />
    </div>
  );
}
