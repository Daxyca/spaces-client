import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Image from "./Image.jsx";

export default function Feed() {
  const { users, feedName } = useOutletContext();
  const [checked, setChecked] = useState(
    users.reduce((obj, user) => ((obj[user.id] = user.isInFeed), obj), {})
  );

  useEffect(() => {
    setChecked(
      users.reduce((obj, user) => ((obj[user.id] = user.isInFeed), obj), {})
    );
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
    const updateFeedUsers = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/feeds/${feedName}`;
        const res = await fetch(endpoint, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        });
        const json = await res.json();
        if (json.like || json.unlike) {
          return json;
        }
      } catch (err) {
        console.error(err);
      }
    };

    updateFeedUsers();
  };

  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();
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
      <h3>{`Included users in ${feedName}`}</h3>
      <form name="delete" onSubmit={handleDeleteFormSubmit} method="post">
        <button name="delete" type="submit">
          Delete
        </button>
      </form>
      <form name="save" onSubmit={handleSaveFormSubmit} method="post">
        <button name="save" type="submit">
          Save
        </button>
        <ul>
          {users.map((user) => {
            if (doneUserIds.includes(user.id)) {
              return null;
            }
            doneUserIds.push(user.id);
            return (
              <li key={user.id}>
                <input
                  type="checkbox"
                  name="ids"
                  id={user.id}
                  value={user.id}
                  checked={checked[user.id] ? true : false}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={user.id}>
                  <Image picture={user.picture} />
                  {user.displayName}
                </label>
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
}
