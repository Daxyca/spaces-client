export async function mainFeed() {
  const endpoint = import.meta.env.VITE_API_URL + "/posts";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function customFeed({ params }) {
  const feedName = params.feedName;
  const endpoint = import.meta.env.VITE_API_URL + "/feeds/" + feedName;
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
