import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import RegisterForm from "./components/Auth/RegisterForm.jsx";
import LoginForm from "./components/Auth/LoginForm.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

export default routes;
