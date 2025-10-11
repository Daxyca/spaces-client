export default function Socials({ loginForm = true }) {
  const handleGithubFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("login", "true");
    event.target.submit();
  };

  return (
    <>
      <hr />
      <form
        className="auth-form github-form"
        action={import.meta.env.VITE_API_URL + "/auth/github"}
        onSubmit={handleGithubFormSubmit}
        method="get"
      >
        <button type="submit">
          {loginForm ? "Login" : "Register"} with GitHub
        </button>
      </form>
    </>
  );
}
