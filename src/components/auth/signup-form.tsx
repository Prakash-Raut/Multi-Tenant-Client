"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import signup from "@/actions/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const initialState = {
	type: "",
	message: "",
};

export const SignUpForm = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) => {
	const [state, formAction, pending] = useActionState(signup, initialState);

	if (state?.type === "success") {
		window.location.href = "/";
	}

	return (
		<form
			action={formAction}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Create a new account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your details to create an account
				</p>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="grid gap-2">
					<Label htmlFor="firstName">First name</Label>
					<Input
						id="firstName"
						name="firstName"
						type="text"
						placeholder="John"
						required
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="lastName">Last name</Label>
					<Input
						id="lastName"
						name="lastName"
						type="lastName"
						placeholder="Doe"
						required
					/>
				</div>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="m@example.com"
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
					<Input id="password" name="password" type="password" required />
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
					{pending ? <Loader2 className="animate-spin" /> : "Sign up"}
				</Button>
			</div>
			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link href="/login" className="underline underline-offset-4">
					Log in
				</Link>
			</div>
		</form>
	);
};
