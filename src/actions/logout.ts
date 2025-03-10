"use server";

import { api } from "@/lib/config";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();

  const response = await fetch(`${api}/api/auth/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
      cookie: `refreshToken=${cookieStore.get("refreshToken")?.value}`,
    },
  });

  if (!response.ok) {
    return false;
  }

  // Clear cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return true;
};
