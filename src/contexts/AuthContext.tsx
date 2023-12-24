import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  getAdditionalUserInfo,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AuthProviderValue, FirebaseProvidersSignIn } from "@/types/Auth";

const AuthContext = React.createContext<AuthProviderValue | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    favMovieGenres: string,
    favTvGenres: string
  ) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredentials.user, {
      displayName: firstName + " " + lastName,
    });

    await setDoc(doc(db, "favGenres", userCredentials.user.uid), {
      movie: favMovieGenres,
      tv: favTvGenres,
    });

    return await sendEmailVerification(userCredentials.user);
  };

  const resendEmailVerification = () => {
    if (user) return sendEmailVerification(user);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const twitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const isNewUser = (userCred: UserCredential) => {
    return getAdditionalUserInfo(userCred)?.isNewUser;
  };

  const providersSignIn: FirebaseProvidersSignIn = {
    Google: googleSignIn,
    Facebook: facebookSignIn,
    Twitter: twitterSignIn,
  };

  const logOut = () => {
    return signOut(auth);
  };

  const resetEmail = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthProviderValue = {
    user,
    signUp,
    signIn,
    logOut,
    providersSignIn,
    resetEmail,
    resendEmailVerification,
    isNewUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
