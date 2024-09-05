"use server";

import { cookies } from "next/headers";

export async function clearAllCookies() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  for (const cookie of allCookies) {
    cookieStore.set(cookie.name, "", { maxAge: 0 });
  }
}
