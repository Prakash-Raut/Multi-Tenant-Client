"use client";

import login from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const initialState = {
	type: "",
	message: "",
};

export const LoginForm = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) => {
	const searchParams = useSearchParams();
	const returnTo = searchParams.get("return-to");

	const [state, formAction, pending] = useActionState(login, initialState);

	if (state?.type === "success") {
		window.location.href = returnTo ? returnTo : "/";
	}

	return (
		<form
			action={formAction}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="m@example.com"
						defaultValue="mike_ross@email.com"
						required
					/>
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<Link
							href="/"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</Link>
					</div>
					<Input
						id="password"
						name="password"
						type="password"
						required
						defaultValue="mike@091"
					/>
				</div>
				<p
					aria-live="polite"
					className={cn("text-sm", {
						"text-red-500": state?.type === "error",
						"text-green-500": state?.type === "success",
					})}
				>
					{state?.message}
				</p>
				<Button type="submit" className="w-full" disabled={pending}>
					{pending ? <Loader2 className="animate-spin" /> : "Login"}
				</Button>
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link href="/signup" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</form>
	);
};
