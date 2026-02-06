import { auth_get_access_server, auth_refresh_token_action } from "@/actions/auth";
import { redirect } from "next/navigation";

export async function fetchWithAuth(url: string) {
  let token = await auth_get_access_server();

  if (!token) {
    const refreshed = await auth_refresh_token_action();
    token = refreshed?.access ?? "";
  }

  if (!token) {
    redirect("/login");
  }

  let res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    const refreshed = await auth_refresh_token_action();
    const newToken = refreshed?.access;

    if (!newToken) {
      redirect("/login");
    }

    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
      cache: "no-store",
    });
  }

  if (res.status === 401) {
    redirect("/login");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}
