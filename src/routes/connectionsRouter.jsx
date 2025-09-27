import ConnectionsPage from "../pages/ConnectionsPage.jsx";
import NotFollowed from "../components/connections/NotFollowed.jsx";
import Following from "../components/connections/Following.jsx";
import Follower from "../components/connections/Followers.jsx";

import * as connectionsLoader from "../loaders/connectionsLoader.js";

export default {
  path: "/connections",
  element: <ConnectionsPage />,
  children: [
    {
      index: true,
      element: <NotFollowed />,
      loader: connectionsLoader.notFollowedLoader,
      HydrateFallback: () => null,
    },
    {
      path: "Following",
      element: <Following />,
      loader: connectionsLoader.followingLoader,
      HydrateFallback: () => null,
    },
    {
      path: "Followers",
      element: <Follower />,
      loader: connectionsLoader.followersLoader,
      HydrateFallback: () => null,
    },
  ],
};
