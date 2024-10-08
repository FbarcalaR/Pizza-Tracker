'use client'
import type { Metadata } from "next";
import "./globals.css";
import FooterMenu from "@/components/footer-menu/footer-menu";
import MainButton from "@/components/main-button/main-button";
import { signInWithGoogle } from '@/api/firebase/firebase-auth';
import { useState } from "react";
import { User } from "firebase/auth";

const metadata: Metadata = {
  title: "Pizza Tracker",
  description: "App to track and save pizza recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User>();

  const handleGoogleLogin = async () => {
    const userResult = await signInWithGoogle();
    if (userResult)
      setUser(userResult);
  };

  return (
    <html lang="en">
      <body className='font-body flex items-center flex-col h-screen'>
        { !!user &&
          <>
            <div className="w-full p-8">
              {children}
            </div>
            <FooterMenu></FooterMenu>
          </>
        }
        { !user &&
            <div className="p-8 sticky top-full flex justify-around w-full">
              <MainButton onClick={handleGoogleLogin}>
                <span className="text-nowrap">Sign In or Sign Up</span>
              </MainButton>
            </div>
        }
      </body>
    </html>
  );
}
