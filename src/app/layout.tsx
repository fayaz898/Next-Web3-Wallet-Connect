"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Web3ContextProvider } from "@/lib/components/Web3ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Web3ContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Web3ContextProvider>
    
  );
}
