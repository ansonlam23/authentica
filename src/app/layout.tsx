"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MiniKitProviderWrapper from "@/components/MiniKitProvider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Removed metadata export since we're now using client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-50">
        <MiniKitProviderWrapper>
          <div className={isLandingPage ? "min-h-full" : "max-w-md mx-auto min-h-full bg-white"}>
            {!isLandingPage && <Header />}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </MiniKitProviderWrapper>
      </body>
    </html>
  );
}
