import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from './initialize-app'

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

const signOutUser = async () => {
  await signOut(auth);
};

// Fires once with the restored session (or null) as soon as Firebase has read
// its persisted credentials, then again on every sign in / sign out.
const subscribeToAuthState = (onUserChanged) =>
  onAuthStateChanged(auth, onUserChanged);

export { auth, signInWithGoogle, signOutUser, subscribeToAuthState };
