import { db } from "@/firebase-config";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

export function handleErrors(error: FirebaseError): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "The provided email address already in use.";
    case "auth/invalid-email":
      return "The provided email address is invalid.";
    case "auth/invalid-credential":
      return "Email or password are incorrect.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Error during email resend.";
    case "auth/too-many-requests":
      return "Too many request, please wait a few seconds and try again.";
    case "auth/user-token-expired":
      return "Your user token has expired. This mean your account has been disabled or deleted.";
    default:
      return error.message;
  }
}

export async function addToCollection(
  collectionName: string,
  data: any,
  ...pathSeg: string[]
) {
  await setDoc(doc(db, collectionName, ...pathSeg), data);
}
