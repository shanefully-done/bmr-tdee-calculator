import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/components/mode-toggle";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BMR & TDEE Calculator",
	description:
		"Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).",
	openGraph: {
		images: "/preview.png",
	},
	twitter: {
		images: "/preview.png",
		card: "summary_large_image",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="absolute top-4 right-4">
						<ModeToggle />
					</div>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
