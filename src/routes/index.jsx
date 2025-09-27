import HomePage from "../pages/HomePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import LogoutPage from "../pages/LogoutPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

import authRoutes from "./authRoutes.jsx";
import connectionsRouter from "./connectionsRouter.jsx";

import profileLoader from "../loaders/profileLoader.js";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  authRoutes,
  connectionsRouter,
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    loader: profileLoader,
    HydrateFallback: () => null,
  },
];

export default routes;
