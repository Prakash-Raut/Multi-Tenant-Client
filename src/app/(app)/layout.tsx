import type React from "react";
import Header from "@/components/navigation/header";

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
