import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Avatar from "./Avatar.jsx";

export default function Feed() {
  const { users, feedName, setFeeds } = useOutletContext();
  const [checked, setChecked] = useState(getChecked(users));

  function getChecked(users) {
    return users.reduce(
      (obj, user) => ((obj[user.id] = user.isInFeed), obj),
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
        if (!json.error) {
          const newFeedUsers = users
            .filter((user) => userIds.includes(user.id))
            .map((user) => ({ ...user, isInFeed: true }));

          setFeeds((prevFeeds) =>
            prevFeeds.map((feed) => {
              if (feed.name === feedName) {
                return {
                  ...feed,
                  users: newFeedUsers,
                };
              }
              return feed;
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    updateFeedUsers();
  };

  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();
    if (!confirm(`The feed "${feedName}" will be deleted. Confirm?`)) return;
    const deleteFeed = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/feeds/${feedName}`;
        const res = await fetch(endpoint, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();
        if (!json.error) {
          setFeeds((prevFeeds) =>
            prevFeeds.filter((feed) => feed.name !== feedName)
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    deleteFeed();
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
      <header className="feed-header">
        <div className="feed-header-left">
          <h3 className="feed-name-heading">{`Included users in ${feedName}`}</h3>

          <form
            className="delete-feed-form"
            id="delete-feed-form"
            name="delete"
            onSubmit={handleDeleteFormSubmit}
            method="post"
          >
            <button
              className="delete-feed-button"
              name="delete"
              type="submit"
              form="delete-feed-form"
              aria-label="Delete Feed"
            >
              <img
                className="delete-feed-image"
                src="/red-trash-can.svg"
                alt="red trash can"
              />
            </button>
          </form>
        </div>
        <div className="feed-header-right">
          <button
            className="button secondary"
            name="save"
            type="submit"
            form="save-feed-form"
          >
            Save Changes
          </button>
        </div>
      </header>
      <form
        className="save-feed-form"
        id="save-feed-form"
        name="save"
        onSubmit={handleSaveFormSubmit}
        method="post"
      >
        <ul className="feed-users-list">
          {users.map((user) => {
            if (doneUserIds.includes(user.id)) {
              return null;
            }
            doneUserIds.push(user.id);
            return (
              <li className="feed-users-list-item" key={user.id}>
                <input
                  className="feed-users-checkbox"
                  type="checkbox"
                  name="ids"
                  id={user.id}
                  value={user.id}
                  checked={checked[user.id] ? true : false}
                  onChange={handleCheckboxChange}
                />
                <label className="feed-users-label" htmlFor={user.id}>
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
          form="save-feed-form"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
