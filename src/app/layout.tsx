import type { Metadata } from "next";
import "./globals.css";
import FooterMenu from "@/components/footer-menu/footer-menu";

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
        <div className="w-full p-8">
          {children}
        </div>
        <FooterMenu></FooterMenu>
      </body>
    </html>
  );
}
