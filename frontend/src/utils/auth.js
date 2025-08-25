const BACKEND = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchUser() {
  try {
    const res = await fetch(`${BACKEND}/api/auth/me`, {
      method: "GET",
      credentials: "include", // send cookie
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    await fetch(`${BACKEND}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {}
}
