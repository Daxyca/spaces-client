export default function Avatar({ picture, alt = "avatar" }) {
  return (
    <div className="avatar-container">
      <img
        src={
          picture
            ? picture.startsWith("/")
              ? import.meta.env.VITE_API_BASE_URL + picture
              : picture
            : import.meta.env.VITE_DEFAULT_AVATAR_URL
        }
        alt={alt}
      />
    </div>
  );
}
