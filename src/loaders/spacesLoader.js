export async function spacesLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/spaces";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function spacesAndFollowersLoader() {
  const spacesEndpoint = import.meta.env.VITE_API_URL + "/spaces";
  const spacesRes = await fetch(spacesEndpoint, {
    credentials: "include",
  });
  const followingEndpoint = import.meta.env.VITE_API_URL + "/follow/following";
  const followingRes = await fetch(followingEndpoint, {
    credentials: "include",
  });
  const spaces = await spacesRes.json();
  const following = await followingRes.json();
  return { spaces, follows: following.follows };
}
