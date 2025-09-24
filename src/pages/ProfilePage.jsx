import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider.jsx";
import Page from "./Page.jsx";
import { Link } from "react-router";

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

  useEffect(() => {
    if (!user) {
      return;
    }
    const getProfile = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/profile";
        const res = await fetch(endpoint, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.get) {
          setProfile(data.profile);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProfile();
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <Page>
      <main className="main">
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
      </main>
    </Page>
  );
}

function ProfileContent({ setMode, profile }) {
  const handleChangeModeClick = () => {
    setMode("Edit");
  };

  return (
    <>
      <Link to="/">Go back to home</Link>
      <h2 className="home-heading">Profile</h2>
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
      <p>Bio: {profile.bio}</p>
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
      console.log(field);
      console.log(value);
    }

    const updateProfilePost = async () => {
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

        const data = await res.json();

        if (data.update) {
          setProfile(newProfile);
          setMode("View");
        }
      } catch (err) {
        console.error(err);
      }
    };
    updateProfilePost();
  };

  return (
    <>
      <Link to="/">Go back to home</Link>
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
          Display Name:{" "}
          <input
            type="text"
            name="displayName"
            id="displayName"
            defaultValue={profile.displayName}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            id="firstName"
            defaultValue={profile.firstName}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={profile.lastName}
          />
        </label>
        <label>
          Birth Date:{" "}
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
          Bio:{" "}
          <input type="text" name="bio" id=" bio" defaultValue={profile.bio} />
        </label>
        <label>
          Sex at Birth:{" "}
          <input
            type="text"
            name="sexAtBirth"
            id="sexAtBirth"
            defaultValue={profile.sexAtBirth}
          />
        </label>
        <label>
          Location:{" "}
          <input
            type="text"
            name="location"
            id=" location"
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
