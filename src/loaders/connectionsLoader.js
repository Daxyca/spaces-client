export async function notFollowedLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/follow/notfollowing";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function followingLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/follow/following";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function followersLoader() {
  console.log("Fetching!!");
  const endpoint = import.meta.env.VITE_API_URL + "/follow/followers";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
