import { Link } from "react-router";
import Page from "./Page.jsx";

export default function ErrorPage() {
  return (
    <Page>
      <h2>404 Page Not Found</h2>
      <Link to="/">Back to home</Link>
    </Page>
  );
}
