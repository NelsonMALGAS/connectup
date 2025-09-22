import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "ConnectUp",
  description: "A digital hub where people can discover, share, and connect around local events, meetups, and activities. It acts like a community noticeboard, but digital — perfect for schools, neighbourhoods, and even online communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="container mx-auto p-8">{children}</main>
          <Toaster duration={3000} position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
