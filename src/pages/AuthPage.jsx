import { Outlet } from "react-router";
import Page from "./Page.jsx";
import "../styles/AuthPage.css";

export default function AuthPage() {
  return (
    <Page>
      <main className="main">
        <Outlet />
      </main>
    </Page>
  );
}
