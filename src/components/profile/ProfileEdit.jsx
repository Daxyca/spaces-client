import { Link, useOutletContext } from "react-router";
import { useState } from "react";

const PROFILE_FIELDS = [
  "displayName",
  "firstName",
  "lastName",
  "birthDate",
  "bio",
  "sexAtBirth",
  "location",
];

export default function ProfileEdit() {
  const { profile, setProfile } = useOutletContext();
  const [errors, setErrors] = useState({});

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProfile = {};
    for (const field of PROFILE_FIELDS) {
      const value = formData.get(field);
      if (value) {
        newProfile[field] = value;
      } else if (value === "") {
        newProfile[field] = null;
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
        if (!json.error) {
          setErrors({});
          setProfile((prev) => ({ ...prev, ...json }));
          window.location.href = "/profile";
        } else {
          if (res.status === 400 && json.error.errors) {
            const newErrors = {};
            json.error.errors.forEach((err) => {
              if (err.path in newErrors) {
                newErrors[err.path].push(err.msg);
              } else {
                newErrors[err.path] = [err.msg];
              }
            });
            setErrors(newErrors);
          } else {
            setErrors([{ unexpected: "An unexpected error occured." }]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    updateProfile();
  };

  const allErrors = [];
  Object.values(errors).forEach((errorArr) =>
    errorArr.forEach((err) => allErrors.push(err))
  );

  return (
    <>
      <div className="edit-profile-container">
        <header className="profile-header">
          <h2 className="profile-heading">Edit Profile</h2>
          <Link to="/profile" aria-label="Go to View Profile Page">
            ↩
          </Link>
        </header>
        <form className="edit-profile-form" onSubmit={handleEditFormSubmit}>
          <label>
            Display Name:
            <input
              type="text"
              name="displayName"
              id="displayName"
              minLength="3"
              maxLength="12"
              placeholder="Display Name"
              defaultValue={profile.displayName}
              required
            />
          </label>
          <label>
            Bio:
            <input
              type="text"
              name="bio"
              id="bio"
              maxLength="250"
              defaultValue={profile.bio}
              placeholder="e.g. Fun Person"
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              defaultValue={profile.firstName}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
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
            Sex at Birth:
            <select
              name="sexAtBirth"
              id="sexAtBirth"
              defaultValue={profile.sexAtBirth ? profile.sexAtBirth : ""}
            >
              <option value="">-</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              id="location"
              placeholder="e.g. US, UK"
              defaultValue={profile.location}
            />
          </label>
          <button className="button" type="submit">
            Update Profile
          </button>

          {Object.keys(errors).length > 0 ? (
            <div className="edit-profile-errors-container">
              {allErrors.map((err) => (
                <p key={err} className="field-error">
                  {err}
                </p>
              ))}
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
}
