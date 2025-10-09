export async function mainSpace() {
  const endpoint = import.meta.env.VITE_API_URL + "/posts";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function customSpace({ params }) {
  const spaceName = params.spaceName;
  const endpoint = import.meta.env.VITE_API_URL + "/spaces/" + spaceName;
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
