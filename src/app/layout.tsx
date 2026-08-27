import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { AuthProvider } from "@/components/common/auth/AuthProvider";
import { Provider } from "@/components/ui/provider";
import { Heading } from "@chakra-ui/react";
import MainMenu from "@/components/navigation/MainMenu";
import { getUser } from "@/services/supabase/auth/server";

export const metadata: Metadata = {
  title: "Sulkabois",
  description:
    "Leaderboard-äppi paljastaa kauden parhaan (ja huonoimman) pelaajan.",
};

const raleway = Raleway({
  variable: "--font-raleway",
  display: "swap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${raleway.className} antialiased`}
        style={{ backgroundColor: "#f0f0f0", margin: 0, padding: 0 }}
      >
        <Provider>
          <AuthProvider initialUser={user}>
            <MainMenu />
            <Heading p={5} fontSize={"3xl"}></Heading>
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
