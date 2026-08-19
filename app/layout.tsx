import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "@/components/common/auth/AuthProvider";
import { Provider } from "@/components/ui/provider";
import { Heading } from "@chakra-ui/react";
import MainMenu from "@/components/navigation/MainMenu";
import { PlayerGroupProvider } from "@/components/context/PlayerGroupContext";
import { getUser } from "@/services/supabase/auth/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Provider>
          <AuthProvider initialUser={user}>
            <PlayerGroupProvider>
              <MainMenu />
              <Heading p={5} fontSize={"3xl"}></Heading>
              {children}
            </PlayerGroupProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
