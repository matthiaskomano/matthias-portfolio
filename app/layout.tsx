import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/Header"; // 1. Import the Header

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Updated metadata for a professional browser tab title
export const metadata: Metadata = {
  title: "Matthias Komano | Full Stack Developer",
  description: "Portfolio of Matthias Komano, Full Stack Developer and Systems Architect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // 3. Added 'scroll-smooth' so your nav links glide nicely down the page
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* 4. Inject the Header globally */}
        <Header />

        {/* 5. The rest of your pages will render inside here */}
        <main className="flex-1">
          {children}
        </main>
        
      </body>
    </html>
  );
}