"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import login from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GOOGLE_OAUTH_URL } from "@/lib/config";
import { cn } from "@/lib/utils";

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

	const router = useRouter();

	const [state, formAction, pending] = useActionState(login, initialState);

	if (state?.type === "success") {
		window.location.href = returnTo ? returnTo : "/";
	}

	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Login with your Google account</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						action={formAction}
						className={cn("flex flex-col gap-6", className)}
						{...props}
					>
						<div className="grid gap-6">
							<div className="flex flex-col gap-4">
								<Button
									variant="outline"
									className="w-full"
									onClick={() => {
										router.push(`${GOOGLE_OAUTH_URL}`);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										role="img"
										aria-labelledby="google-icon-title"
									>
										<title id="google-icon-title">Google Login Icon</title>
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									Login with Google
								</Button>
							</div>
						</div>
						<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
							<span className="relative z-10 bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
						<div className="grid gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									defaultValue="arun@email.com"
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
									defaultValue="arun@2001"
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
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By clicking continue, you agree to our{" "}
				<Link href="/">Terms of Service</Link> and{" "}
				<Link href="/">Privacy Policy</Link>.
			</div>
		</div>
	);
};
