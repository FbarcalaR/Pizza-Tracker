'use client'

import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { signInWithGoogle, subscribeToAuthState } from '@/api/firebase/firebase-auth';
import FooterMenu from "@/components/footer-menu/footer-menu";
import MainButton from "@/components/main-button/main-button";

export default function AuthGate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isResolvingSession, setIsResolvingSession] = useState(true);
  const [signInError, setSignInError] = useState<string>();

  useEffect(() => {
    // Restores an existing session on reload and keeps `user` in sync afterwards.
    const unsubscribe = subscribeToAuthState((nextUser: User | null) => {
      setUser(nextUser);
      setIsResolvingSession(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setSignInError(undefined);
    try {
      await signInWithGoogle();
    } catch (error) {
      setSignInError(describeSignInError(error));
    }
  };

  if (isResolvingSession) {
    return <div className="p-8 sticky top-full flex justify-around w-full">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-8 sticky top-full flex flex-col gap-3 w-full">
        {signInError && <span className="text-center text-sm text-red-600">{signInError}</span>}
        <MainButton onClick={handleGoogleLogin}>
          <span className="text-nowrap">Sign In or Sign Up</span>
        </MainButton>
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-8">
        {children}
      </div>
      <FooterMenu></FooterMenu>
    </>
  );
}

function describeSignInError(error: unknown) {
  const code = (error as { code?: string })?.code;
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign in was cancelled.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign in popup. Allow popups for this site and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorised in Firebase Authentication. Add it under Authentication > Settings > Authorized domains.';
    default:
      return `Could not sign in${code ? ` (${code})` : ''}. Please try again.`;
  }
}
