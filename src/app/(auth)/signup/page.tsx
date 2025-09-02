import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/signup-form";
import Logo from "@/components/icons/logo";

export const metadata: Metadata = {
	title: "Create Your Pizza Galleria Account",
	description:
		"Access your Pizza Galleria account to track orders, save favorites, and enjoy a personalized pizza ordering experience.",
};

const SignUpPage = () => {
	return (
		<div className="grid min-h-screen w-full lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<Logo />
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<SignUpForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					src="/pizza-login.webp"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					width={500}
					height={800}
				/>
			</div>
		</div>
	);
};

export default SignUpPage;
