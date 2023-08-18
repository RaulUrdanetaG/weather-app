import { initializeApp } from 'firebase/app';

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

export default app;
