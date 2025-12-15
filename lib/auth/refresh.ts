import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function refreshToken(val: { refresh: RequestCookie }) {
  try {
    const res = await fetch(
      `${process.env.BASE_BACKEND_URL}/auth/token/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed refresh:", await res.text());
      return { access: null, refresh: null };
    }

    const data: { access: string | null; refresh: string | null } =
      await res.json();
    return {
      access: data.access ?? null,
      refresh: data.refresh ?? null,
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to refresh token");
  }
}
