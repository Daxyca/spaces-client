import ErrorPage from "../pages/ErrorPage.jsx";
import LogoutPage from "../pages/LogoutPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import SpacesPage from "../pages/SpacesPage.jsx";

import connectionsRoute from "./connectionsRoute.jsx";

import * as postsLoader from "../loaders/postsLoader.js";
import * as spacesLoader from "../loaders/spacesLoader.js";
import protectedLoader from "../loaders/protectedLoader.js";

import Posts from "../components/Posts.jsx";
import Space from "../components/Space.jsx";
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
        loader: protectedLoader(postsLoader.mainSpace),
        HydrateFallback: () => null,
      },
      {
        path: "spaces/:spaceName/posts",
        element: <Posts />,
        loader: protectedLoader(postsLoader.customSpace),
        HydrateFallback: () => null,
      },
      connectionsRoute,
      {
        path: "spaces",
        element: <SpacesPage />,
        children: [
          {
            path: ":spaceName/edit",
            element: <Space />,
          },
        ],
        loader: protectedLoader(spacesLoader.spacesAndFollowersLoader),
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
