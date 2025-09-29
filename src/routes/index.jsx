import HomePage from "../pages/HomePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import LogoutPage from "../pages/LogoutPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

import authRoutes from "./authRoutes.jsx";
import connectionsRouter from "./connectionsRouter.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

import postsLoader from "../loaders/postsLoader.js";
import profileLoader from "../loaders/profileLoader.js";

const profileEntries = {
  element: (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
  loader: profileLoader,
  HydrateFallback: () => null,
};

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    loader: postsLoader,
    HydrateFallback: () => null,
    errorElement: <ErrorPage />,
  },
  authRoutes,
  connectionsRouter,
  {
    path: "/logout",
    element: (
      <ProtectedRoute>
        <LogoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    ...profileEntries,
  },
  {
    path: "/profile/:userId",
    ...profileEntries,
  },
];

export default routes;
