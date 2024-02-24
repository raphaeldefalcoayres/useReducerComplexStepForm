"use client";

import { Inter } from "next/font/google";
import { StateProvider } from "../states/context";
import { reducer } from "../states/reducer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <StateProvider reducer={reducer}>{children}</StateProvider>
      </body>
    </html>
  );
}
