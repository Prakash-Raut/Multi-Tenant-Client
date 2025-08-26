import Refresher from "@/components/navigation/refresher";
import { Toaster } from "@/components/ui/sonner";
import AmplitudeContextProvider from "@/lib/providers/AmplitudeProvider";
import QueryProvider from "@/lib/providers/QueryProvider";
import StoreProvider from "@/lib/providers/StoreProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pizza Galleria - Order Pizza Online",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-32x32.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<StoreProvider>
				<body className={`${manrope.variable} antialiased`}>
					<AmplitudeContextProvider>
						<QueryProvider>
							<Refresher>
								<main className="container mx-auto flex flex-col items-center justify-between">
									{children}
								</main>
							</Refresher>
						</QueryProvider>
					</AmplitudeContextProvider>
					<Toaster richColors />
				</body>
			</StoreProvider>
		</html>
	);
}
