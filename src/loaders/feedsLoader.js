export default async function feedsLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/feeds";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
