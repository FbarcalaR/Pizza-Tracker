'use client'
import { getAuth, getRedirectResult, GoogleAuthProvider, User, signInWithRedirect, Auth } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";

export default async function useLogIn() {
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User>();
    const auth = getAuth();

    useMemo(() => {
        if(auth.currentUser) return;
        getRedirectResult(auth)
            .then(async (result) => {
            if(!auth.currentUser)
                signIn(auth)
            if(!result) return;
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if(!credential) return null;
    
            const foundToken = credential.accessToken;
            setToken(foundToken);
    
            const foundUser = result.user;
            setUser(foundUser);
    
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
    
            console.error('error while login user', error, errorCode, errorMessage, email, credential);
        });
    }, [auth]);
    return { token, user };
  }

async function signIn(auth: Auth) {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
}