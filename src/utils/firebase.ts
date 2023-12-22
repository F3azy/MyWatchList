import { FirebaseError } from "firebase/app";

export function handleErrors(error: FirebaseError): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Provided email address already in use.";
    case "auth/invalid-email":
      return "Provided email address is invalid.";
    case "auth/invalid-credential":
      return "Email or password are incorrect.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Error during email resend.";
    case "auth/too-many-requests":
      return "Too many request, please wait a few seconds and try again.";
    default:
      return error.message;
  }
}
