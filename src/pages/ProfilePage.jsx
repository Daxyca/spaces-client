import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider.jsx";
import Page from "./Page.jsx";
import { useLoaderData, useParams } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import "../styles/ProfilePage.css";

const PROFILE_FIELDS = [
  "displayName",
  "firstName",
  "lastName",
  "birthDate",
  "bio",
  "sexAtBirth",
  "location",
];

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [mode, setMode] = useState("View"); // View or Edit
  const [profile, setProfile] = useState({});
  const data = useLoaderData();

  useEffect(() => {
    setProfile(data.profile);
  }, [data]);

  if (!data || !user) {
    return;
  }

  const isCurrentUser = !userId || userId === user.id;

  return (
    <Page>
      {!user || !profile.id ? null : mode === "View" ? (
        <ProfileContent
          profile={profile}
          setMode={isCurrentUser ? setMode : () => {}}
          isCurrentUser={isCurrentUser}
        />
      ) : isCurrentUser && mode === "Edit" ? (
        <ProfileForm
          profile={profile}
          setProfile={setProfile}
          setMode={setMode}
          user={user}
        />
      ) : null}
    </Page>
  );
}

function ProfileContent({ setMode, profile, isCurrentUser }) {
  const [picture, setPicture] = useState(profile.picture);
  const handleChangeModeClick = () => {
    setMode("Edit");
  };

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
        <div className="profile-left">
          <h2 className="home-heading">Profile</h2>
          {picture ? (
            <div className="profile-picture-container">
              <img
                src={
                  import.meta.env.VITE_API_BASE_URL +
                  (picture ? picture : "/pictures/default.jpg")
                }
                alt="Your profile picture"
              />
            </div>
          ) : (
            "No picture"
          )}
          {isCurrentUser ? (
            <>
              <form
                onSubmit={handlePictureFormSubmit}
                method="post"
                encType="multipart/form-data"
              >
                Change Picture:
                <input type="file" name="picture" required />
                <button type="submit">Upload</button>
              </form>

              <button
                className="button accent"
                type="button"
                onClick={handleChangeModeClick}
              >
                Edit
              </button>
            </>
          ) : null}
          <p>Display Name: {profile.displayName}</p>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          <p>Birth Date: {profile.birthDate}</p>
          <p>Bio: {profile.bio || "No bio..."}</p>
          <p>Sex at Birth: {profile.sexAtBirth}</p>
          <p>Location: {profile.location}</p>
        </div>
        <div className="profile-right">
          <h3>{profile.displayName}'s Posts</h3>
          {profile.posts.map((post) => (
            <PostCard
              post={post}
              key={post.id}
              alreadyLiked={post.likes.length > 0 ? true : false}
              handleLikeUnlikeClick={handleLikeUnlikeClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function ProfileForm({ setMode, profile, setProfile }) {
  const handleChangeModeClick = () => {
    setMode("View");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newProfile = {
      id: 1,
    };

    for (const field of PROFILE_FIELDS) {
      const value = formData.get(field);
      if (value) {
        newProfile[field] = value;
      }
    }

    const updateProfile = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + `/profile`;
        const res = await fetch(endpoint, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newProfile),
        });
        const json = await res.json();
        if (json.update) {
          setProfile(newProfile);
          setMode("View");
        }
      } catch (err) {
        console.error(err);
      }
    };
    updateProfile();
  };

  return (
    <>
      <h2 className="home-heading">Profile</h2>
      <button
        className="button accent"
        type="button"
        onClick={handleChangeModeClick}
      >
        Back
      </button>
      <form onSubmit={handleFormSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            name="displayName"
            id="displayName"
            defaultValue={profile.displayName}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            id="firstName"
            defaultValue={profile.firstName}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={profile.lastName}
          />
        </label>
        <label>
          Birth Date:
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            defaultValue={
              profile.birthDate ? profile.birthDate.slice(0, 10) : null
            }
          />
        </label>
        <label>
          Bio:
          <input type="text" name="bio" id="bio" defaultValue={profile.bio} />
        </label>
        <label>
          Sex at Birth:
          <input
            type="text"
            name="sexAtBirth"
            id="sexAtBirth"
            defaultValue={profile.sexAtBirth}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={profile.location}
          />
        </label>
        <button className="button" type="submit">
          Edit
        </button>
      </form>
    </>
  );
}
