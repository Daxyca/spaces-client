import ConnectionsPage from "../pages/ConnectionsPage.jsx";
import NotFollowed from "../components/connections/NotFollowed.jsx";
import Following from "../components/connections/Following.jsx";
import Follower from "../components/connections/Followers.jsx";
import PendingRequests from "../components/connections/PendingRequests.jsx";
import FollowersRequests from "../components/connections/FollowersRequests.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

import * as connectionsLoader from "../loaders/connectionsLoader.js";

export default {
  path: "/connections",
  element: (
    <ProtectedRoute>
      <ConnectionsPage />
    </ProtectedRoute>
  ),

  children: [
    {
      index: true,
      element: <NotFollowed />,
      loader: connectionsLoader.notFollowedLoader,
      HydrateFallback: () => null,
    },
    {
      path: "following",
      element: <Following />,
      loader: connectionsLoader.followingLoader,
      HydrateFallback: () => null,
    },
    {
      path: "followers",
      element: <Follower />,
      loader: connectionsLoader.followersLoader,
      HydrateFallback: () => null,
    },
    {
      path: "followers/requests",
      element: <FollowersRequests />,
      loader: connectionsLoader.followersRequestsLoader,
      HydrateFallback: () => null,
    },
    {
      path: "following/requests",
      element: <PendingRequests />,
      loader: connectionsLoader.pendingRequestsLoader,
      HydrateFallback: () => null,
    },
  ],
};
