import { User, UserCredential } from "firebase/auth";

export type FirebaseProviders = "Google" | "Facebook" | "Twitter";

export type FirebaseProvidersSignIn = {
  [key in FirebaseProviders]: () => Promise<UserCredential>;
}

export type AuthProviderValue = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  resetEmail: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
  providersSignIn: FirebaseProvidersSignIn;
};