import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router";
import { useEffect, useState } from "react";
import "../styles/SpacesPage.css";
import { useSpaces } from "../contexts/SpacesContext.js";
import { parseValidationErrors } from "../utils.js";

export default function SpacesPage() {
  const data = useLoaderData(); // follows
  let { spaceName } = useParams();
  const { spaces, setSpaces } = useSpaces();
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (spaces.length === 0 || !spaceName) {
      return;
    }

    // Filter for the current space
    const filteredSpaces = spaces.filter(
      (space) => space.name === spaceName
    )[0];
    if (!filteredSpaces || filteredSpaces.length === 0) {
      return;
    }

    // Group users included in the space first
    const spaceUsers = filteredSpaces.users.map((user) => ({
      ...user,
      isInSpace: true,
    }));

    // Group followed users not included in the space
    const spaceUserIds = spaceUsers.map((user) => user.id);
    const usersFollowed = data.follows
      .map((follow) => ({ ...follow.following, isInSpace: false }))
      .filter((user) => !spaceUserIds.includes(user.id));

    // Set users
    setUsers([...spaceUsers, ...usersFollowed]);
  }, [data, spaceName, spaces]);

  if (!data) {
    return;
  }

  const handleCreateSpaceSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const createSpace = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/spaces";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name }),
        });
        const json = await res.json();
        if (!json.error) {
          setErrors({});
          setSpaces((prevSpace) => [...prevSpace, json]);
          navigate(`/spaces/${json.name}/edit`);
          form.reset();
        } else {
          setErrors(parseValidationErrors(res.status, json));
        }
      } catch (err) {
        console.error(err);
      }
    };
    createSpace();
  };

  return (
    <div className="spaces-main-container">
      <div className="spaces-left-container">
        <div className="spaces-left-main">
          <h3 className="spaces-heading">Spaces List</h3>
          <ul className="spaces-list">
            {spaces.map((space) => (
              <li key={space.id} className="spaces-list-item">
                <Link key={space.id} to={`/spaces/${space.name}/edit`}>
                  {space.name}
                </Link>
              </li>
            ))}
          </ul>
          <hr />
          <form
            className="create-space-form"
            name="create"
            onSubmit={handleCreateSpaceSubmit}
            method="post"
          >
            <input
              className="space-name-input"
              type="text"
              name="name"
              id="name"
              placeholder="Space name"
              minLength={3}
              maxLength={12}
              required
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
            <button className="button create-space-button" type="submit">
              Create Space
            </button>
          </form>
        </div>
      </div>
      <div className="spaces-right-container">
        {spaces.length > 0 ? (
          spaceName ? (
            <Outlet context={{ users, spaceName, setSpaces, spaces }} />
          ) : (
            "Choose a space."
          )
        ) : (
          "No spaces created. Create a space first."
        )}
      </div>
    </div>
  );
}
