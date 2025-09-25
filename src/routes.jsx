import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ConnectionsPage from "./pages/ConnectionsPage.jsx";
import Page from "./pages/Page.jsx";

const routes = [
  {
    path: "/",
    element: <Page />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          {
            path: "register",
            element: <RegisterForm />,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
        ],
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
    ],
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
