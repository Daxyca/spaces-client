import AuthPage from "../pages/AuthPage.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";

export default {
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
};
