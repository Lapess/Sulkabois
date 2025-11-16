import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Button, Heading, Link } from "@chakra-ui/react";
import MainMenu from "@/components/navigation/MainMenu";

export const metadata: Metadata = {
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
        <Provider>
          {/* <MainMenu /> */}
          <Heading p={5} fontSize={"3xl"}></Heading>
          {children}
        </Provider>
      </body>
    </html>
  );
}
