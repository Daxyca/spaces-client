import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const loadingMessages = [
  "🧠 Booting up the AI neurons...",
  "☕ Brewing fresh code...",
  "🚀 Spinning up Render servers… please stand by!",
  "🐢 Slow start? Must be Monday.",
  "💾 Warming up backend cache (and our hearts).",
  "🔧 Tightening virtual bolts and digital screws…",
  "🛰️ Contacting the mothership...",
  "👀 Looking busy while the backend wakes up...",
  "📡 Sending good vibes to the server...",
  "🐙 Summoning the API Kraken...",
  "🌌 Aligning the bits and bytes...",
  "🤖 Teaching the backend how to respond politely...",
  "🪄 Performing a bit of startup magic...",
  "🧩 Connecting the missing semicolons...",
  "🎩 Abracadabra… loading something amazing...",
  "🔥 The backend is waking up — don’t make eye contact!",
  "🛠️ Building something cool in the background...",
  "🌈 Fetching rainbows (and data)...",
  "🕓 Patience level: Jedi Master.",
  "📦 Unpacking virtual assets… please wait.",
];

export default function LoadingPage() {
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    const checkServerHealth = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/health");
        const json = await res.json();
        if (!json.error) {
          setLoading(false);
          navigate("/auth/login");
          return;
        }
      } catch (err) {
        // ignore; server may still be starting
      }
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingMessage(loadingMessages[randomIndex]);
      timeout = setTimeout(checkServerHealth, 3000);
    };
    checkServerHealth();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="loading-container">
      {loading ? (
        <p className="loading-text">
          Server loading...
          <br />
          {loadingMessage}
        </p>
      ) : (
        <p className="loading-text">
          ✅ Backend is ready! <br />
          Redirecting to Login page...
        </p>
      )}
    </main>
  );
}
