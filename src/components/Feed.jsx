import { Fragment, useEffect, useState } from "react";
import { useOutletContext } from "react-router";

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

  if (!feedName) {
    return <h3>Nothing to see here... Create a feed.</h3>;
  }

  if (users.length === 0) {
    return <h3>You are not following anyone.</h3>;
  }

  const handleSaveFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const ids = formData.getAll("ids");
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
      <h3>{feedName ? feedName : "Nothing to see here... Create a feed."}</h3>
      <form name="delete" onSubmit={handleDeleteFormSubmit} method="post">
        <button name="delete" type="submit">
          Delete
        </button>
      </form>
      <form name="save" onSubmit={handleSaveFormSubmit} method="post">
        <button name="save" type="submit">
          Save
        </button>
        {users.map((user) => {
          if (doneUserIds.includes(user.id)) {
            return null;
          }
          doneUserIds.push(user.id);
          return (
            <Fragment key={user.id}>
              <input
                type="checkbox"
                name="ids"
                id={user.displayName}
                value={user.id}
                checked={checked[user.id]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={user.displayName}>{user.displayName}</label>
            </Fragment>
          );
        })}
      </form>
    </>
  );
}
