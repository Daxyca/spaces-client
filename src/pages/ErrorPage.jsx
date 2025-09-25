import { Link } from "react-router";
import Page from "./PageC.jsx";

export default function ErrorPage() {
  return (
    <Page>
      <main className="main">
        <h2>404 Page Not Found</h2>
        <Link to="/">Back to home</Link>
      </main>
    </Page>
  );
}
