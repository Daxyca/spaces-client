export default async function profileLoader({ params }) {
  const userId = params.userId ? `/${params.userId}` : "";
  const endpoint = import.meta.env.VITE_API_URL + "/profile" + userId;
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
