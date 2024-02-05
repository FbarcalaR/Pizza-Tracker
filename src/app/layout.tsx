import type { Metadata } from "next";
import "./globals.css";
import FooterMenu from "@/components/footer-menu/footer-menu";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='font-body flex items-center flex-col h-screen'>
        {children}
        <FooterMenu></FooterMenu>
      </body>
    </html>
  );
}
