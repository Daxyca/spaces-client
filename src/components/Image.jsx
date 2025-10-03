export default function Image({ picture }) {
  return (
    <div className="profile-picture-container">
      <img
        src={
          picture
            ? picture.startsWith("/")
              ? import.meta.env.VITE_API_BASE_URL + picture
              : picture
            : import.meta.env.VITE_API_BASE_URL + "/pictures/default.jpg"
        }
        alt="profile picture"
      />
    </div>
  );
}
