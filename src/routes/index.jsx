import HomePage from "../pages/HomePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import LogoutPage from "../pages/LogoutPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ConnectionsPage from "../pages/ConnectionsPage.jsx";
import Page from "../pages/Page.jsx";
import authRoutes from "./authRoutes.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  authRoutes,
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/connections",
    element: <ConnectionsPage />,
  },
];

export default routes;
