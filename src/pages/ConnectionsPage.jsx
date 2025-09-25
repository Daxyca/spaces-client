import { Link, Outlet } from "react-router";
import Page from "./Page.jsx";
import { useEffect } from "react";
import "../styles/ConnectionsPage.css";

export default function ConnectionsPage() {
  useEffect(() => {}, []);

  return (
    <Page>
      <Link to="/">Back to home</Link>
      <h2>Connections</h2>
      <div className="connections-container">
        <div className="connections-left">
          <Link to="">Not Followed</Link>
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
