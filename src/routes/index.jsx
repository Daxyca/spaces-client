import HomePage from "../pages/HomePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import LogoutPage from "../pages/LogoutPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import FeedsPage from "../pages/FeedsPage.jsx";

import authRoutes from "./authRoutes.jsx";
import connectionsRouter from "./connectionsRouter.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

import * as postsLoader from "../loaders/postsLoader.js";
import * as feedsLoader from "../loaders/feedsLoader.js";
import * as connectionsLoader from "../loaders/connectionsLoader.js";
import profileLoader from "../loaders/profileLoader.js";
import Posts from "../components/Posts.jsx";
import Feed from "../components/Feed.jsx";

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
    loader: feedsLoader.feedsLoader,
    HydrateFallback: () => null,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Posts />,
        loader: postsLoader.mainFeed,
        HydrateFallback: () => null,
      },
      {
        path: "feeds/:feedName",
        element: <Posts />,
        loader: postsLoader.customFeed,
        HydrateFallback: () => null,
      },
    ],
  },
  {
    path: "/edit/feeds",
    element: (
      <ProtectedRoute>
        <FeedsPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ":feedName",
        element: <Feed />,
      },
    ],
    loader: feedsLoader.feedsAndFollowersLoader,
    HydrateFallback: () => null,
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
