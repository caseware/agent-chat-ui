import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: "AiDA",
  description: "AiDA Agent Chat",
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" }
    ],
    apple: { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
