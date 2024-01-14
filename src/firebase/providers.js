import { Tune } from "@mui/icons-material";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {

    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL
    }

  } catch (error) {

    const { message } = error;

    return {
      ok: false,
      errorMessage: message
    }
  }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile( FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName
    }
  } catch (error ) {

    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const loginWithEmailPassword = async({ email, password }) => {

  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid, photoURL, email, displayName
    }
  } catch (error ) {

    return {
      ok: false,
      errorMessage: error.message
    }
  }

}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}