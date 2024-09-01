import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProfInsight AI",
  description: "Get the Full Picture on Your Professors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cover text-white">
        {children}
      </body>
    </html>
  );
}
