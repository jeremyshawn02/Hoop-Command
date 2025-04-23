import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Hoop Command",
  description: "Skripsi Shawn Gacor 99",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-[#C7A39F]`}
      >
        {children}
      </body>
    </html>
  );
}
