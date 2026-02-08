import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function refreshToken(val: { refresh: { value: string } }) {
  if (!val.refresh) {
    redirect("/login");
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: val.refresh.value }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorText = await res.text().catch(() => "No error body");
      console.warn("Refresh token API failed:", res.status, errorText);
      redirect("/login");
    }

    const data: { access: string | null; refresh: string | null } =
      await res.json();

    return {
      access: data.access ?? null,
      refresh: data.refresh ?? null,
    };
  } catch (err) {
    // If it's a redirect error from a nested call (unlikely here but good practice), let it bubble
    if (isRedirectError(err)) throw err;

    console.error("Internal error during token refresh:", err);
    return { access: null, refresh: null };
  }
}
