/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-extraneous-dependencies
import { EventEmitter } from 'events';
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

import { setUpNavBar } from '../modules/nav-bar';

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
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  }
}

export async function signInWithEmail(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.message);
  }
}

export async function logInWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.message);
  }
}
export async function logOut() {
  try {
    await signOut(auth);
    // console.log('logged out');
  } catch (error) {
    console.log(error.message);
  }
}

onAuthStateChanged(auth, async (user) => {
  try {
    setUpNavBar(user);
  } catch (error) {
    console.log(error);
  }
});
