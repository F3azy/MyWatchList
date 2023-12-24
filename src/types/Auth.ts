import { User, UserCredential } from "firebase/auth";

export type FirebaseProviders = "Google" | "Facebook" | "Twitter";

export type FirebaseProvidersSignIn = {
  [key in FirebaseProviders]: () => Promise<UserCredential>;
};

export type AuthProviderValue = {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    favMovieGenres: string,
    favTvGenres: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  resetPassWord: (email: string) => Promise<void>;
  resendEmailVerification: () => Promise<void> | undefined;
  logOut: () => Promise<void>;
  providersSignIn: FirebaseProvidersSignIn;
  isNewUser: (userCred: UserCredential) => boolean | undefined;
};
