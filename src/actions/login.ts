"use server";

import * as cookie from "cookie";
import { cookies } from "next/headers";
import { api } from "@/lib/config";

export default async function login(
	prevState: Record<string, unknown>,
	formData: FormData,
) {
	const email = formData.get("email");
	const password = formData.get("password");

	if (!email || !password) {
		return {
			type: "error",
			message: "Email and password are required",
		};
	}

	try {
		const response = await fetch(`${api}/api/auth/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const err = await response.json();
			return {
				type: "error",
				message: err.errors[0].msg ?? "Login failed",
			};
		}

		const c = response.headers.getSetCookie();

		const accessToken = c.find((cookie) => cookie.includes("accessToken"));
		const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

		if (!accessToken || !refreshToken) {
			return { type: "error", message: "No cookies found" };
		}

		const parsedAccessToken = cookie.parse(accessToken);
		const parsedRefreshToken = cookie.parse(refreshToken);

		const cookieStore = await cookies();

		if (!parsedAccessToken.accessToken || !parsedRefreshToken.refreshToken) {
			return { type: "error", message: "Token could not be parsed" };
		}

		if (!parsedAccessToken.Expires || !parsedRefreshToken.Expires) {
			return { type: "error", message: "Token could not be parsed" };
		}

		cookieStore.set("accessToken", parsedAccessToken.accessToken, {
			expires: new Date(parsedAccessToken.Expires),
			httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
			domain: parsedAccessToken.Domain,
			path: parsedAccessToken.Path,
			sameSite: parsedAccessToken.SameSite as "strict",
		});

		cookieStore.set("refreshToken", parsedRefreshToken.refreshToken, {
			expires: new Date(parsedRefreshToken.Expires),
			httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
			domain: parsedRefreshToken.Domain,
			path: parsedRefreshToken.Path,
			sameSite: parsedRefreshToken.SameSite as "strict",
		});

		return { type: "success", message: "Login successful" };
	} catch (error) {
		console.error("Login failed", error, prevState);
		return {
			type: "error",
			message: "An error occurred while logging in!",
		};
	}
}
