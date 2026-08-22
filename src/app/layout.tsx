import type { Metadata } from "next";
import "./globals.css";
import AuthGate from "@/components/auth-gate/auth-gate";

export const metadata: Metadata = {
  title: "Pizza Tracker",
  description: "App to track and save pizza recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='font-body flex items-center flex-col h-screen'>
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
