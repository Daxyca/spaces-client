import { Link, Outlet } from "react-router";
import Page from "./Page.jsx";
import { useEffect } from "react";
import "../styles/ConnectionsPage.css";

export default function ConnectionsPage() {
  useEffect(() => {}, []);

  return (
    <Page>
      <h2>Connections</h2>
      <div className="connections-container">
        <div className="connections-left">
          <h3>Create Connections</h3>
          <Link to="">Not Followed</Link>
          <Link to="followers/requests">Followers Requests</Link>
          <h3>View Connections</h3>
          <Link to="following/requests">Pending Requests</Link>
          <Link to="following">Following</Link>
          <Link to="followers">Followers</Link>
        </div>
        <div className="connections-right">
          <Outlet />
        </div>
      </div>
    </Page>
  );
}
