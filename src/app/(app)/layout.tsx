import type React from "react";
import { Suspense } from "react";
import Header from "@/components/navigation/header";

const AppLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className="container mx-auto flex flex-col items-center justify-between">
			<Suspense fallback={<div>Loading...</div>}>
				<Header />
			</Suspense>
			{children}
		</main>
	);
};

export default AppLayout;
