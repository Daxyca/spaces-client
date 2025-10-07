import { Link, Outlet } from "react-router";
import { useEffect } from "react";
import "../styles/ConnectionsPage.css";

export default function ConnectionsPage() {
  useEffect(() => {}, []);

  return (
    <>
      <h2 className="visually-hidden">Connections</h2>
      <div className="connections-container">
        <div className="connections-left-container">
          <div className="connections-left-main">
            <h3>Create Connections</h3>
            <Link to="">Not Followed</Link>
            <Link to="followers/requests">Followers Requests</Link>
            <h3>View Connections</h3>
            <Link to="following/requests">Pending Requests</Link>
            <Link to="following">Following</Link>
            <Link to="followers">Followers</Link>
          </div>
        </div>
        <div className="connections-right-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
