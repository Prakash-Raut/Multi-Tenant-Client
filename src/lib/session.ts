import { cookies } from "next/headers";
import { api } from "./config";

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: "admin" | "customer" | "manager";
	tenantId: number | null;
}

interface Session {
	user: User;
}

export const getSession = async () => {
	return await getSelf();
};

export const getSelf = async (): Promise<Session | null> => {
	try {
		const token = (await cookies()).get("accessToken")?.value;
		if (!token) {
			return null;
		}
		const response = await fetch(`${api}/api/auth/auth/self`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			cache: "no-store",
		});

		if (!response.ok) {
			return null;
		}

		const user = (await response.json()) as User;
		return { user };
	} catch (_error) {
		// console.error("Failed to get self", error);
		return null;
	}
};
