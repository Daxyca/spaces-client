import { useNavigate } from "react-router";

export default function RegisterForm() {
  const navigate = useNavigate();

  function handleRegisterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const submit = async () => {
      try {
        const endpoint = import.meta.env.VITE_API_URL + "/auth/register";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (data.register) {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    };
    submit();
  }

  return (
    <>
      <form onSubmit={handleRegisterSubmit} method="post">
        <h2>Register</h2>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            minLength="3"
            required
          />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" required />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            minLength="3"
            required
          />
        </label>
        <button className="button accent" type="submit">
          Register
        </button>
      </form>
    </>
  );
}
