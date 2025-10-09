import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Avatar from "./Avatar.jsx";

export default function Space() {
  const { users, spaceName, setSpaces } = useOutletContext();
  const [checked, setChecked] = useState(getChecked(users));

  function getChecked(users) {
    return users.reduce(
      (obj, user) => ((obj[user.id] = user.isInSpace), obj),
      {}
    );
  }

  useEffect(() => {
    setChecked(getChecked(users));
  }, [users]);

  if (users.length === 0) {
    return (
      <p>You are not following anyone. Follow users in the Connections page.</p>
    );
  }

  if (checked.length === 0) {
    return;
  }

  const handleSaveFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userIds = formData.getAll("ids");
    const updateSpaceUsers = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/spaces/${spaceName}`;
        const res = await fetch(endpoint, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        });
        const json = await res.json();
        if (!json.error) {
          const newSpaceUsers = users
            .filter((user) => userIds.includes(user.id))
            .map((user) => ({ ...user, isInSpace: true }));

          setSpaces((prevSpaces) =>
            prevSpaces.map((space) => {
              if (space.name === spaceName) {
                return {
                  ...space,
                  users: newSpaceUsers,
                };
              }
              return space;
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    updateSpaceUsers();
  };

  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();
    if (!confirm(`The space "${spaceName}" will be deleted. Confirm?`)) return;
    const deleteSpace = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/spaces/${spaceName}`;
        const res = await fetch(endpoint, {
          method: "DELETE",
          credentials: "include",
        });
        const json = await res.json();
        if (!json.error) {
          setSpaces((prevSpaces) =>
            prevSpaces.filter((space) => space.name !== spaceName)
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    deleteSpace();
  };

  const handleCheckboxChange = (event) => {
    const { value: userId, checked } = event.target;
    setChecked((prev) => ({
      ...prev,
      [userId]: checked,
    }));
  };

  const doneUserIds = [];

  return (
    <>
      <header className="space-header">
        <div className="space-header-left">
          <h3 className="space-name-heading">{`Included users in ${spaceName}`}</h3>

          <form
            className="delete-space-form"
            id="delete-space-form"
            name="delete"
            onSubmit={handleDeleteFormSubmit}
            method="post"
          >
            <button
              className="delete-space-button"
              name="delete"
              type="submit"
              form="delete-space-form"
              aria-label="Delete Space"
            >
              <img
                className="delete-space-image"
                src="/red-trash-can.svg"
                alt="red trash can"
              />
            </button>
          </form>
        </div>
        <div className="space-header-right">
          <button
            className="button secondary"
            name="save"
            type="submit"
            form="save-space-form"
          >
            Save Changes
          </button>
        </div>
      </header>
      <form
        className="save-space-form"
        id="save-space-form"
        name="save"
        onSubmit={handleSaveFormSubmit}
        method="post"
      >
        <ul className="space-users-list">
          {users.map((user) => {
            if (doneUserIds.includes(user.id)) {
              return null;
            }
            doneUserIds.push(user.id);
            return (
              <li className="space-users-list-item" key={user.id}>
                <input
                  className="space-users-checkbox"
                  type="checkbox"
                  name="ids"
                  id={user.id}
                  value={user.id}
                  checked={checked[user.id] ? true : false}
                  onChange={handleCheckboxChange}
                />
                <label className="space-users-label" htmlFor={user.id}>
                  <Avatar picture={user.picture} />
                  {user.displayName}
                </label>
              </li>
            );
          })}
        </ul>
        <button
          className="button secondary bottom-button"
          name="save"
          type="submit"
          form="save-space-form"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
