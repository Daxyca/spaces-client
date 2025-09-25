import { Link } from "react-router";
import Page from "./Page.jsx";
import { useEffect } from "react";

export default function ConnectionsPage() {
  useEffect(() => {}, []);

  return (
    <Page>
      <Link to="/">Back to home</Link>
      <h2>Connections</h2>
      <Link to="">Not Followed</Link>
      <Link to="following">Following</Link>
      <Link to="followers">Followers</Link>
    </Page>
  );
}
