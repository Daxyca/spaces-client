import ErrorPage from "../pages/ErrorPage.jsx";
import LogoutPage from "../pages/LogoutPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import FeedsPage from "../pages/FeedsPage.jsx";

import connectionsRoute from "./connectionsRoute.jsx";

import * as postsLoader from "../loaders/postsLoader.js";
import * as feedsLoader from "../loaders/feedsLoader.js";
import protectedLoader from "../loaders/protectedLoader.js";

import Posts from "../components/Posts.jsx";
import Feed from "../components/Feed.jsx";
import ProfileContent from "../components/profile/ProfileContent.jsx";
import ProfileEdit from "../components/profile/ProfileEdit.jsx";
import { ProfileProvider } from "../contexts/ProfileProvider.jsx";
import ProtectedPage from "../pages/ProtectedPage.jsx";

const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Posts />,
        loader: protectedLoader(postsLoader.mainFeed),
        HydrateFallback: () => null,
      },
      {
        path: "feeds/:feedName/posts",
        element: <Posts />,
        loader: protectedLoader(postsLoader.customFeed),
        HydrateFallback: () => null,
      },
      connectionsRoute,
      {
        path: "feeds",
        element: <FeedsPage />,
        children: [
          {
            path: ":feedName/edit",
            element: <Feed />,
          },
        ],
        loader: protectedLoader(feedsLoader.feedsAndFollowersLoader),
        HydrateFallback: () => null,
      },
      {
        path: "/auth/logout",
        element: <LogoutPage />,
      },

      {
        path: "/profile",
        element: (
          <ProfileProvider>
            <ProfilePage />
          </ProfileProvider>
        ),
        HydrateFallback: () => null,
        children: [
          {
            index: true,
            element: <ProfileContent />,
          },
          {
            path: "edit",
            element: <ProfileEdit />,
          },
          {
            path: ":userId",
            element: <ProfileContent />,
          },
        ],
      },
    ],
  },
];

export default protectedRoutes;
