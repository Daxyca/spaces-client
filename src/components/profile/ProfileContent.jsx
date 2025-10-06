import { useEffect, useState } from "react";
import Image from "../Image.jsx";
import PostCard from "../PostCard.jsx";

export default function ProfileContent({ setMode, profile, isCurrentUser }) {
  const [picture, setPicture] = useState(profile.picture);

  useEffect(() => {
    setPicture(profile.picture);
  }, [profile.picture]);

  function handlePictureFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatePicturePost = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/profile/picture`;
        const res = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const json = await res.json();
        if (json.picture) {
          setPicture(json.picture);
        }
      } catch (err) {
        console.error(err);
      }
    };
    updatePicturePost();
  }

  const handleChangeModeClick = () => {
    setMode("Edit");
  };

  const handleLikeUnlikeClick = async (event, liked) => {
    const likeBtn = event.currentTarget;
    const postId = likeBtn.dataset.id;
    const likePost = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/posts/${postId}/like`;
        const res = await fetch(endpoint, {
          method: liked ? "DELETE" : "POST",
          credentials: "include",
        });
        const json = await res.json();
        if (json.like || json.unlike) {
          return json;
        }
      } catch (err) {
        console.error(err);
      }
    };
    return await likePost();
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-left-container">
          <header className="profile-header">
            <h2 className="profile-heading">Profile</h2>
            <button
              className="button edit-mode-button"
              type="button"
              onClick={handleChangeModeClick}
              aria-label="Go to Edit Profile"
            >
              ✎
            </button>
          </header>
          <div className="profile-main-info">
            <Image picture={picture} />
            <p>{profile.displayName || "-"}</p>
          </div>
          {isCurrentUser ? (
            <>
              <form
                className="change-picture-form"
                onSubmit={handlePictureFormSubmit}
                method="post"
                encType="multipart/form-data"
              >
                <label htmlFor="new-profile-picture">
                  Change Profile Picture:
                </label>
                <input
                  id="new-profile-picture"
                  type="file"
                  name="picture"
                  required
                />
                <button className="button" type="submit">
                  Upload Picture
                </button>
              </form>
            </>
          ) : null}
          <p>First Name: {profile.firstName || "-"}</p>
          <p>Last Name: {profile.lastName || "-"}</p>
          <p>Birth Date: {profile.birthDate || "-"}</p>
          <p>Bio: {profile.bio || "-"}</p>
          <p>Sex at Birth: {profile.sexAtBirth || "-"}</p>
          <p>Location: {profile.location || "-"}</p>
        </div>
        <div className="profile-right-container">
          <h2>Posts</h2>
          {profile.posts.map((post) => (
            <PostCard
              post={post}
              key={post.id}
              currentUserPicture={picture}
              alreadyLiked={post.likes.length > 0 ? true : false}
              handleLikeUnlikeClick={handleLikeUnlikeClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
