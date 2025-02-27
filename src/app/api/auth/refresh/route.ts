import { api } from "@/lib/config";
import * as cookie from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${api}/api/auth/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
        Cookie: `refreshToken=${cookieStore.get("refreshToken")?.value}`,
      },
    });

    if (!response.ok) {
      console.error("Refresh failed", response.status);
      return NextResponse.json({ success: false });
    }

    const c = response.headers.getSetCookie();

    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      console.error("Token could not found", response.status);
      return NextResponse.json({ success: false });
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    cookieStore.set("accessToken", parsedAccessToken.accessToken!, {
      expires: new Date(parsedAccessToken.Expires!),
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      domain: parsedAccessToken.Domain,
      path: parsedAccessToken.Path,
      sameSite: parsedAccessToken.SameSite as "strict",
    });

    cookieStore.set("refreshToken", parsedRefreshToken.refreshToken!, {
      expires: new Date(parsedRefreshToken.Expires!),
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      domain: parsedRefreshToken.Domain,
      path: parsedRefreshToken.Path,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return NextResponse.json({ success: false });
  }
}
