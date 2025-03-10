import Header from "@/components/custom/header";
import type React from "react";

const AppLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className="container mx-auto flex flex-col items-center justify-between">
			<Header />
			{children}
		</main>
	);
};

export default AppLayout;
