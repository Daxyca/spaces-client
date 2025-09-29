import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider.jsx";
import Page from "./Page.jsx";
import { useLoaderData } from "react-router-dom";

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
  const { user } = useAuth();
  const [mode, setMode] = useState("View"); // View or Edit
  const [profile, setProfile] = useState({});
  const data = useLoaderData();

  useEffect(() => {
    setProfile(data.profile);
  }, []);

  if (!data) {
    return;
  }

  return (
    <Page>
      {!user || !profile.id ? null : mode === "View" ? (
        <ProfileContent profile={profile} setMode={setMode} />
      ) : mode === "Edit" ? (
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

function ProfileContent({ setMode, profile }) {
  const [picture, setPicture] = useState(profile.picture);
  const handleChangeModeClick = () => {
    setMode("Edit");
  };

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
        console.log({ json });
        if (json.picture) {
          setPicture(json.picture);
        }
      } catch (err) {
        console.error(err);
      }
    };
    updatePicturePost();
  }

  return (
    <>
      <h2 className="home-heading">Profile</h2>
      {picture ? (
        <div className="profile-picture-container">
          <img
            src={import.meta.env.VITE_API_BASE_URL + picture}
            alt="Your profile picture"
          />
        </div>
      ) : (
        "No picture"
      )}
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
      <p>Display Name: {profile.displayName}</p>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Birth Date: {profile.birthDate}</p>
      <p>Bio: {profile.bio || "No bio..."}</p>
      <p>Sex at Birth: {profile.sexAtBirth}</p>
      <p>Location: {profile.location}</p>
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
