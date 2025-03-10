"use client";

import * as jose from "jose";
import React from "react";

const Refresher = ({ children }: { children: React.ReactNode }) => {
	const timeoutId = React.useRef<NodeJS.Timeout>(null);
	const getAccessToken = async () => {
		try {
			const response = await fetch("/api/auth/accessToken");

			if (!response.ok) {
				return;
			}

			const accessToken = await response.json();
			return accessToken.token;
		} catch (error) {
			console.error("Failed to get access token", error);
		}
	};

	const refreshAccessToken = React.useCallback(async () => {
		try {
			const response = await fetch("/api/auth/refresh", {
				method: "POST",
			});

			if (!response.ok) {
				console.error("Failed to refresh access token", response.status);
				return;
			}
		} catch (error) {
			console.error("Failed to refresh access token", error);
		}

		startRefresh();
	}, []);

	const memoizedGetAccessToken = React.useCallback(getAccessToken, []);

	const startRefresh = React.useCallback(async () => {
		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}

		try {
			const accessToken = await memoizedGetAccessToken();

			if (!accessToken) {
				return;
			}

			const token = jose.decodeJwt(accessToken);

			const expiry = token.exp ? token.exp * 1000 : 0;
			const currentTime = Date.now();
			const refreshTime = expiry - currentTime - 5000; // 5 seconds before expiry

			timeoutId.current = setTimeout(() => {
				refreshAccessToken();
			}, refreshTime);
		} catch (error) {
			console.error("Failed to start refresh", error);
		}
	}, [refreshAccessToken, memoizedGetAccessToken]);

	React.useEffect(() => {
		startRefresh();

		return () => {
			if (timeoutId.current) {
				clearTimeout(timeoutId.current);
			}
		};
	}, [startRefresh]);

	return <div>{children}</div>;
};

export default Refresher;
