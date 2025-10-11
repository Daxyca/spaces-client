export default function Socials({ loginForm = true }) {
  return (
    <>
      <hr />
      <a
        className="github-auth-link"
        href={import.meta.env.VITE_API_URL + "/auth/github"}
        onClick={() => localStorage.setItem("login", "true")}
      >
        {loginForm ? "Login" : "Register"} with GitHub
      </a>
    </>
  );
}
