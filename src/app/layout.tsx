import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Authentica",
  description: "Verified human reviews for local places - powered by World ID",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-50">
        <MiniKitProviderWrapper>
          <div className="max-w-md mx-auto min-h-full bg-white">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </MiniKitProviderWrapper>
      </body>
    </html>
  );
}
