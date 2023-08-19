/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { updateNavBar, handleLogInErr } from '../modules/nav-bar';

const firebaseConfig = {
  apiKey: 'AIzaSyDT0ETwyhjAxMiiPsLM2oyt-cfsSgfW3l0',
  authDomain: 'weather-app-519a7.firebaseapp.com',
  projectId: 'weather-app-519a7',
  storageBucket: 'weather-app-519a7.appspot.com',
  messagingSenderId: '923250483112',
  appId: '1:923250483112:web:b7f9474eece6c02de0079d',
  measurementId: 'G-Y6H3G9D9L3',
};
const app = initializeApp(firebaseConfig);

// authentication
const auth = getAuth(app);

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
  } catch (error) {
    handleLogInErr(error);
  }
}

export async function signInWithEmail(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    handleLogInErr(error);
  }
}

export async function logInWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    handleLogInErr(error);
  }
}
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    handleLogInErr(error);
  }
}

onAuthStateChanged(auth, async (user) => {
  try {
    updateNavBar(user);
  } catch (error) {
    handleLogInErr(error);
  }
});
