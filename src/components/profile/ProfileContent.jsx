import { useRef, useState } from "react";
import Avatar from "../Avatar.jsx";
import PostCard from "../PostCard.jsx";
import { Link, useOutletContext } from "react-router";
import { useProfile } from "../../contexts/ProfileContext.js";

const FOLLOW_ENDPOINTS = {
  follow: ["POST", "following"],
  unfollow: ["DELETE", "following"],
  cancel: ["DELETE", "following"],
  accept: ["PATCH", "followers"],
  decline: ["DELETE", "followers"],
  remove: ["DELETE", "followers"],
};

const PROFILE_KEY = {
  followers: "following",
  following: "followers",
};

export default function ProfileContent() {
  const { isCurrentUser } = useOutletContext();
  const { profile, setProfile } = useProfile();
  const [picture, setPicture] = useState(profile.picture);
  const pending = useRef();

  function handlePictureFormSubmit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
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
      } finally {
        pending.current = false;
      }
    };
    updatePicturePost();
  }

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

  const handleFollowButtonClick = (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    const submitType = button.value;
    const followBaseUrl = import.meta.env.VITE_API_URL + "/follow";
    const submit = async () => {
      try {
        const [method, followPath] = FOLLOW_ENDPOINTS[submitType];
        const endpoint = `${followBaseUrl}/${followPath}/${profile.id}`;
        const res = await fetch(endpoint, {
          method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        if (json.error) {
          button.disabled = false;
          throw new Error(json.error);
        }
        if (method === "DELETE") {
          setProfile((prevProfile) => ({
            ...prevProfile,
            [PROFILE_KEY[followPath]]: [],
          }));
          button.disabled = false;
        } else {
          setProfile((prevProfile) => ({
            ...prevProfile,
            [PROFILE_KEY[followPath]]: [json],
          }));
          button.disabled = false;
        }
      } catch (err) {
        button.disabled = false;
        console.error(err);
      }
    };
    submit();
  };

  const handleFollowFormSubmit = (event) => {
    event.preventDefault();
  };

  const sentFollowed = profile.followers.length > 0;
  const isFollowed = sentFollowed && profile.followers[0].status === "Accepted";
  const receivedFollow = profile.following.length > 0;
  const isFollower =
    receivedFollow && profile.following[0].status === "Accepted";

  return (
    <>
      <div className="profile-container">
        <div className="profile-left-container">
          <header className="profile-header">
            <h2 className="profile-heading">Profile</h2>
            {isCurrentUser ? (
              <Link to="/profile/edit" aria-label="Go to Edit Profile Page">
                ✎
              </Link>
            ) : null}
          </header>
          <div className="profile-content">
            <div className="profile-main-info">
              <Avatar picture={picture} />
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
                    className="picture-input"
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
            {isCurrentUser ? null : (
              <form
                id="profile-follow-form"
                className="profile-follow-form"
                action={import.meta.env.VITE_API_URL + "/follow"}
                onSubmit={handleFollowFormSubmit}
                method="post"
              >
                {sentFollowed ? (
                  isFollowed ? (
                    <button
                      className="button alt"
                      name="submit"
                      value="unfollow"
                      onClick={handleFollowButtonClick}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="button alt"
                      name="submit"
                      value="cancel"
                      onClick={handleFollowButtonClick}
                    >
                      Cancel Request
                    </button>
                  )
                ) : (
                  <button
                    className="button"
                    name="submit"
                    value="follow"
                    onClick={handleFollowButtonClick}
                  >
                    Follow User
                  </button>
                )}
                {receivedFollow ? (
                  isFollower ? (
                    <button
                      className="button alt"
                      name="submit"
                      value="remove"
                      onClick={handleFollowButtonClick}
                    >
                      Remove Follower
                    </button>
                  ) : (
                    <>
                      <button
                        className="button"
                        name="submit"
                        value="accept"
                        onClick={handleFollowButtonClick}
                      >
                        Accept Request
                      </button>
                      <button
                        className="button alt"
                        name="submit"
                        value="decline"
                        onClick={handleFollowButtonClick}
                      >
                        Decline Request
                      </button>
                    </>
                  )
                ) : null}
              </form>
            )}
          </div>
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
