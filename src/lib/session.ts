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
  const response = await fetch(`${api}/api/auth/auth/self`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return {
    user: (await response.json()) as User,
  };
};
