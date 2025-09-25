import ConnectionsPage from "../pages/ConnectionsPage.jsx";
import NotFollowed from "../components/connections/NotFollowed.jsx";
import Following from "../components/connections/Following.jsx";
import Follower from "../components/connections/Followers.jsx";

export default {
  path: "/connections",
  element: <ConnectionsPage />,
  children: [
    {
      index: true,
      element: <NotFollowed />,
    },
    {
      path: "Following",
      element: <Following />,
    },
    {
      path: "Followers",
      element: <Follower />,
    },
  ],
};
