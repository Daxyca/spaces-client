export async function feedsLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/feeds";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function feedsAndFollowersLoader() {
  const feedsEndpoint = import.meta.env.VITE_API_URL + "/feeds";
  const feedsRes = await fetch(feedsEndpoint, {
    credentials: "include",
  });
  const followingEndpoint = import.meta.env.VITE_API_URL + "/follow/following";
  const followingRes = await fetch(followingEndpoint, {
    credentials: "include",
  });
  const feeds = await feedsRes.json();
  const following = await followingRes.json();
  return { feeds, follows: following.follows };
}
