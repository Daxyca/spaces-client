import { Link } from "react-router";
import Page from "./PageC.jsx";
import { useEffect } from "react";

export default function ConnectionsPage() {
  useEffect(() => {}, []);

  return (
    <Page>
      <main className="main">
        <Link to="/">Back to home</Link>
        <h2>Connections</h2>
        <Link to="">Not Followed</Link>
        <Link to="following">Following</Link>
        <Link to="followers">Followers</Link>
      </main>
    </Page>
  );
}
