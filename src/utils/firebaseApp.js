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
import {
  getFirestore,
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
} from 'firebase/firestore';

import {
  updateNavBar,
  handleLogInErr,
  removeLogInModal,
  removeSignInModal,
} from '../modules/nav-bar';

import {
  updateSearchBar,
  handleSearchErr,
  clearSearchForm,
  createCityWeather,
} from '../modules/content';

import { checkCityExistance } from './weatherApp';

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

// firestore database

const db = getFirestore();

async function addUserToDb(user) {
  const userDocRef = doc(db, 'users', user.uid);
  try {
    await setDoc(userDocRef, { units: 'metric', cities: [] }); // new user sets metric system as default
  } catch (error) {
    console.log(error);
  }
}

export async function addCity(cityName) {
  const currentUser = auth.currentUser;

  const uid = currentUser.uid;
  const userDocRef = doc(db, 'users', uid);

  const checkResult = await checkCityExistance(cityName);
  if (checkResult) {
    // if city exists add it to database
    clearSearchForm();
    handleSearchErr(false); // dont handle error
    try {
      const userCities = await getUserCities();
      // if city already exists dont do anything
      if (userCities.some((city) => city === cityName)) {
      } else {
        await updateDoc(userDocRef, {
          cities: arrayUnion(cityName),
        });
        createCityWeather(cityName);
      }
    } catch (error) {}
  } else {
    handleSearchErr(true); //handle error
  }
}

export async function getUserCities() {
  const currentUser = auth.currentUser;

  const uid = currentUser.uid;
  const userDocRef = doc(db, 'users', uid);

  try {
    const userCitiesSnapshot = await getDoc(userDocRef);
    return userCitiesSnapshot.data().cities;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserUnits(units) {
  const currentUser = auth.currentUser;

  const uid = currentUser.uid;
  const userDocRef = doc(db, 'users', uid);

  try {
    await updateDoc(userDocRef, {
      units: `${units}`,
    });
  } catch (error) {}
}

// searchs in database user unit system preferences
export async function getUserUnits() {
  const currentUser = auth.currentUser;

  const uid = currentUser.uid;
  const userDocRef = doc(db, 'users', uid);

  try {
    const userCitiesSnapshot = await getDoc(userDocRef);
    return userCitiesSnapshot.data().units;
  } catch (error) {
    console.log(error);
  }
}

// authentication
const auth = getAuth(app);

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    addUserToDb(result.user); // Creates user as doc in firestore
  } catch (error) {
    handleLogInErr(error);
  }
}

export async function signInWithEmail(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    removeSignInModal();
    addUserToDb(result.user); // Creates user as doc in firestore
  } catch (error) {
    handleLogInErr(error);
  }
}

export async function logInWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    removeLogInModal();
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
    updateSearchBar(user);
  } catch (error) {
    handleLogInErr(error);
  }
});
