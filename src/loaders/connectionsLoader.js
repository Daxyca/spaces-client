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
  const endpoint = import.meta.env.VITE_API_URL + "/follow/followers";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function pendingRequestsLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/follow/following/requests";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}

export async function followersRequestsLoader() {
  const endpoint = import.meta.env.VITE_API_URL + "/follow/followers/requests";
  const res = await fetch(endpoint, {
    credentials: "include",
  });
  return res.json();
}
