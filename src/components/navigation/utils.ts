"use client";

import * as jose from "jose";
import type React from "react";

export const getAccessToken = async (): Promise<string | null> => {
	try {
		const response = await fetch("/api/auth/accessToken");

		if (!response.ok) {
			console.error(
				"Access token request failed with status:",
				response.status,
			);
			return null;
		}

		const { token } = await response.json();

		return token;
	} catch (error) {
		console.error("Failed to get access token", error);
		return null;
	}
};

export const startRefresh = async (
	timeoutId: React.RefObject<number | null>,
) => {
	if (timeoutId?.current) {
		clearTimeout(timeoutId.current);
	}

	try {
		let accessToken = await getAccessToken();

		if (!accessToken) {
			console.error("No access token found. Attempting to refresh.");
			accessToken = await refreshAccessToken();
		}

		// If still no access token, stop refresh cycle
		if (!accessToken) {
			console.error(
				"No access token available after refresh attempt. Stopping refresh cycle.",
			);
			return;
		}

		const token = jose.decodeJwt(accessToken);

		if (!token.exp) {
			console.warn("Token has no expiration time. Stopping refresh cycle.");
			return;
		}

		const expiry = token.exp ? token.exp * 1000 : 0;
		const currentTime = Date.now();
		const refreshTime = expiry - currentTime - 5000; // 5 seconds before expiry

		if (refreshTime <= 0) {
			console.warn(
				"Token already expired or close to expiry. Refreshing immediately.",
			);
			await refreshAccessToken();
			return;
		}

		timeoutId.current = window.setTimeout(() => {
			refreshAccessToken();
		}, refreshTime);
	} catch (error) {
		console.error("Failed to start refresh", error);
	}
};

export const refreshAccessToken = async () => {
	try {
		const response = await fetch("/api/auth/refresh", {
			method: "POST",
		});

		if (!response.ok) {
			console.error("Failed to refresh access token", response.status);
			return;
		}

		const { token } = await response.json();

		if (!token) {
			console.error("No token received after refresh.");
			return;
		}

		startRefresh(token);

		return token;
	} catch (error) {
		console.error("Failed to refresh access token", error);
	}
};
