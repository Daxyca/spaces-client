import { Outlet } from "react-router";
import Page from "./Page.jsx";
import "../styles/App.css";

export default function AuthPage() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}
