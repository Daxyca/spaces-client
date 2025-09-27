export default async function profileLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/profile";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
