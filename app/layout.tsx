import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Heading } from "@chakra-ui/react";
import MainMenu from "@/components/navigation/MainMenu";
import { PlayerGroupProvider } from "@/components/context/PlayerGroupContext";

export const metadata: Metadata = {
  title: "Sulkabois",
  description:
    "Leaderboard-äppi paljastaa kauden parhaan (ja huonoimman) pelaajan.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <PlayerGroupProvider>
          <Provider>
            <MainMenu />
            <Heading p={5} fontSize={"3xl"}></Heading>
            {children}
          </Provider>
        </PlayerGroupProvider>
      </body>
    </html>
  );
}
