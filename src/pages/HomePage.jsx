import { Outlet, useParams } from "react-router";
import Page from "./Page.jsx";

export default function HomePage() {
  const { feedName } = useParams();

  return (
    <Page>
      <div className="posts-container">
        <Outlet context={{ feedName }} />
      </div>
    </Page>
  );
}
