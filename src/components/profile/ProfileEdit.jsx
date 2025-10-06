import { useNavigate } from "react-router";

const PROFILE_FIELDS = [
  "displayName",
  "firstName",
  "lastName",
  "birthDate",
  "bio",
  "sexAtBirth",
  "location",
];

export default function ProfileEdit({ setMode, profile, setProfile }) {
  const navigate = useNavigate();

  const handleChangeModeClick = () => {
    setMode("View");
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProfile = {};
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
        console.log("edit profile json");
        console.log(json);
        if (json) {
          setProfile((prev) => ({ ...prev, ...json }));
          navigate("/profile");
          // setMode("View");
        }
      } catch (err) {
        console.error(err);
      }
    };
    updateProfile();
  };

  return (
    <>
      <header className="profile-header">
        <h2 className="profile-heading">Edit Profile</h2>
        <button
          className="button accent profile-back-button"
          type="button"
          onClick={handleChangeModeClick}
          aria-label="Back to View Profile"
        >
          ↩
        </button>
      </header>
      <div className="edit-profile-container">
        <form className="edit-profile-form" onSubmit={handleEditFormSubmit}>
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
      </div>
    </>
  );
}
