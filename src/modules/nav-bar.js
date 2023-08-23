/* eslint-disable no-use-before-define */
import closeImg from '../assets/close-outline.svg';
import googleLogo from '../assets/logo-google.svg';
import titleLogo from '../assets/partly_cloudy_day.svg';
import { setUnits, updateCitiesGrid } from './content';
import {
  signInWithEmail,
  signInWithGoogle,
  logInWithEmail,
  logOut,
  getUserUnits,
  updateUserUnits,
} from '../utils/firebaseApp';

const header = document.querySelector('header');

function createSignInModal() {
  const signInModalContainer = document.createElement('div');
  signInModalContainer.id = 'sign-in-modal';
  signInModalContainer.innerHTML = `<img class = 'close-img' src = '${closeImg}'>
                                    <h4 class = 'form-title'>Sign Up</h4>
                                    <h6 class = 'error-text'></h6>
                                    <form class = 'sign-in'>
                                      <label for = 'email'>Email:</label>
                                      <input name = 'email' type = 'email' placeholder = 'email@example.com'>
                                      <label for = 'password'>Password:</label>
                                      <input name = 'password' type = 'password' placeholder = 'Your password'>
                                      <button id = 'sign-in-button'>Sign Up</button>
                                    </form>
                                    <h6 class = 'separator'>or</h6>
                                    <button id = 'google-sign-in'><img class = 'google-logo'src ='${googleLogo}'>Sign up with google</button>`;
  header.appendChild(signInModalContainer);

  const signInWithGoogleBtn = document.getElementById('google-sign-in');
  signInWithGoogleBtn.addEventListener('click', () => {
    signInWithGoogle();
    removeSignInModal();
  });
  const signIn = document.querySelector('.sign-in');
  signIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signIn.email.value;
    const password = signIn.password.value;
    signInWithEmail(email, password);
  });

  const closeBtn = document.querySelector('.close-img');
  closeBtn.onclick = () => {
    removeSignInModal();
  };
}

export function removeSignInModal() {
  const signInModalContainer = document.getElementById('sign-in-modal');
  header.removeChild(signInModalContainer);
}

function createLogInModal() {
  const logInModalContainer = document.createElement('div');
  logInModalContainer.id = 'log-in-modal';
  logInModalContainer.innerHTML = `<img class = 'close-img' src = '${closeImg}'>
                                    <h4 class = 'form-title'>Log In</h4>
                                    <h6 class = 'error-text'></h6>
                                    <form class = log-in>
                                      <label for = 'email'>Email:</label>
                                      <input name = 'email' type='email' placeholder = 'email@example.com'>
                                      <label for = 'password'>Password:</label>
                                      <input name = 'password' type='password' placeholder='Your password'>
                                      <button id='log-in-button'>Log In</button>
                                    </form>
                                    <h6 class = 'separator'>or</h6>
                                    <button id = 'google-log-in'><img class = 'google-logo'src ='${googleLogo}'>Log in with google</button>`;
  header.appendChild(logInModalContainer);

  const logInWithGoogleBtn = document.getElementById('google-log-in');
  logInWithGoogleBtn.addEventListener('click', () => {
    signInWithGoogle();
    removeLogInModal();
  });

  const logIn = document.querySelector('.log-in');
  logIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = logIn.email.value;
    const password = logIn.password.value;
    logInWithEmail(email, password);
  });

  const closeBtn = document.querySelector('.close-img');
  closeBtn.onclick = () => {
    removeLogInModal();
  };
}

export function removeLogInModal() {
  const logInModal = document.getElementById('log-in-modal');
  header.removeChild(logInModal);
}

function createLogInButtons() {
  const logInBtns = document.createElement('div');
  logInBtns.id = 'log-in-container';
  header.appendChild(logInBtns);

  const signInBtn = document.createElement('button');
  signInBtn.id = 'sign-in-button';
  signInBtn.innerText = 'Sign Up';
  logInBtns.appendChild(signInBtn);

  signInBtn.onclick = () => {
    const logInModal = document.getElementById('log-in-modal');
    const signInModal = document.getElementById('sign-in-modal');
    logInModal ? removeLogInModal() : undefined;
    signInModal ? undefined : createSignInModal();
  };

  const logInBtn = document.createElement('button');
  logInBtn.id = 'log-in-button';
  logInBtn.innerText = 'Log In';
  logInBtns.appendChild(logInBtn);

  logInBtn.onclick = () => {
    const signInModal = document.getElementById('sign-in-modal');
    const logInModal = document.getElementById('log-in-modal');
    signInModal ? removeSignInModal() : undefined;
    logInModal ? undefined : createLogInModal();
  };

  header.appendChild(logInBtns);
}

function createLogOut(user) {
  const logOutContainer = document.createElement('div');
  logOutContainer.id = 'log-out-container';
  logOutContainer.innerHTML = `<h6>Logged in as:</h6>
                              <h5>${user.email}</h5>
                              <button id = 'log-out-button'>Log Out</button>`;
  header.appendChild(logOutContainer);

  const logOutBtn = document.getElementById('log-out-button');

  logOutBtn.onclick = () => {
    logOut();
  };
}

function removeLogInButtons() {
  const logInBtns = document.getElementById('log-in-container');
  header.removeChild(logInBtns);
}

function removeLogOut() {
  const logOutContainer = document.getElementById('log-out-container');
  header.removeChild(logOutContainer);
}

function addUnitBtns() {
  const unitBtns = document.createElement('div');
  unitBtns.id = 'unit-buttons';
  unitBtns.innerHTML = `<button id = 'celsius-button'>°C | kph</button>
                        <button id = 'farenheit-button'>°F | mph</button>`;
  header.appendChild(unitBtns);

  updateUnitBtns();
}

function updateUnitBtns() {
  const celsiusBtn = document.getElementById('celsius-button');
  const farenheitBtn = document.getElementById('farenheit-button');
  celsiusBtn.onclick = () => {
    updateUserUnits('metric');
    celsiusBtn.classList.add('selected');
    farenheitBtn.classList.remove('selected');
    setUnits('metric');
    updateCitiesGrid();
  };

  farenheitBtn.onclick = () => {
    updateUserUnits('imperial');
    celsiusBtn.classList.remove('selected');
    farenheitBtn.classList.add('selected');
    setUnits('imperial');
    updateCitiesGrid();
  };

  getUserUnits().then((response) => {
    if (response === 'metric') {
      celsiusBtn.classList.add('selected');
      farenheitBtn.classList.remove('selected');
      setUnits(response);
    } else if (response === 'imperial') {
      celsiusBtn.classList.remove('selected');
      farenheitBtn.classList.add('selected');
      setUnits(response);
    }
  });
}

function removeUnitBtns() {
  const unitBtns = document.getElementById('unit-buttons');
  header.removeChild(unitBtns);
}

export function updateNavBar(user) {
  const logOutContainer = document.getElementById('log-out-container');
  const logInBtns = document.getElementById('log-in-container');
  if (user) {
    logInBtns ? removeLogInButtons() : undefined;
    createLogOut(user);
    addUnitBtns();
  } else {
    logOutContainer ? removeLogOut() : undefined;
    createLogInButtons();
    removeUnitBtns();
  }
}

export function handleLogInErr(error) {
  const errorText = document.querySelector('.error-text');
  switch (error.code) {
    case 'auth/invalid-email':
      errorText.innerText = `Please enter a valid email`;
      break;
    case 'auth/email-already-in-use':
      errorText.innerText = `User already exists, try logging in`;
      break;
    case 'auth/user-not-found':
      errorText.innerText = `User does not exist, try signing up`;
      break;
    case 'auth/wrong-password':
      errorText.innerText = `Wrong email or password`;
      break;
    case 'auth/missing-password':
      errorText.innerText = `Please enter a password`;
      break;
    case 'auth/missing-email':
      errorText.innerText = `Please enter a valid email`;
      break;
    case 'auth/weak-password':
      errorText.innerText = `Password should be at least 6 characters`;
      break;
    default:
      break;
  }
}

export default function createNavBar() {
  const headerTitle = document.createElement('h2');
  headerTitle.id = 'header-title';
  headerTitle.innerHTML = `<img class = 'title-logo' src = '${titleLogo}'>
                          Sky Scope`;

  header.appendChild(headerTitle);
}
