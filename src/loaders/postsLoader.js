export default async function postsLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/posts";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
