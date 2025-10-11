import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      const authComplete = async () => {
        try {
          const res = await fetch(
            import.meta.env.VITE_API_URL + "/auth/complete",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ token }),
            }
          );
          const json = await res.json();
          console.log(json);
          if (json.success) {
            window.history.replaceState({}, "", "/");
            window.location.href = import.meta.env.VITE_BASENAME;
          } else {
            window.location.href =
              import.meta.env.VITE_BASENAME + "/auth/login";
          }
        } catch (err) {
          console.error(err);
        }
      };
      authComplete();
    }
  }, []);

  return <p>Logging in...</p>;
}
