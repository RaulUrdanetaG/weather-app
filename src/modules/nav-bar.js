/* eslint-disable no-use-before-define */
import closeImg from '../assets/close-outline.svg';
import { signInWithEmail, logInWithEmail, logOut } from '../utils/firebaseApp';

import { signInWithGoogle } from '../utils/firebaseApp';

const header = document.querySelector('header');

function createSignInModal() {
  const signInModalContainer = document.createElement('div');
  signInModalContainer.id = 'sign-in-modal';
  signInModalContainer.innerHTML = `<img class = 'close-img' src = '${closeImg}'>
                                    <form class = 'sign-in'>
                                      <input name = 'email' type = 'email' placeholder = 'email@example.com'>
                                      <input name = 'password' type = 'password' placeholder = 'your password'>
                                      <button id = 'sign-in'>Sign In</button>
                                    </form>
                                    <h6>OR</h6>
                                    <button id = 'google-sign-in'>Sign in with google</button>`;
  header.appendChild(signInModalContainer);

  const signInWithGoogleBtn = document.getElementById('google-sign-in');
  signInWithGoogleBtn.addEventListener('click', () => {
    removeSignInModal();
    signInWithGoogle();
  });
  const signIn = document.querySelector('.sign-in');
  signIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signIn.email.value;
    const password = signIn.password.value;
    signInWithEmail(email, password);
    signIn.reset();
    removeSignInModal();
  });

  const closeBtn = document.querySelector('.close-img');
  closeBtn.onclick = () => {
    removeSignInModal();
  };
}

function removeSignInModal() {
  const signInModalContainer = document.getElementById('sign-in-modal');
  header.removeChild(signInModalContainer);
}

function createLogInModal() {
  const logInModalContainer = document.createElement('div');
  logInModalContainer.id = 'log-in-modal';
  logInModalContainer.innerHTML = `<img class = 'close-img' src = '${closeImg}'>
                                    <form class = log-in>
                                      <input name = 'email' type='email' placeholder = 'email@example.com'>
                                      <input name = 'password' type='password' placeholder='password'>
                                      <button id='log-in-button'>Log In</button>
                                    </form>
                                    <h6>OR</h6>
                                    <button id = 'google-log-in'>Log in with google</button>`;
  header.appendChild(logInModalContainer);

  const logInWithGoogleBtn = document.getElementById('google-log-in');
  logInWithGoogleBtn.addEventListener('click', () => {
    removeLogInModal();
    signInWithGoogle();
  });

  const logIn = document.querySelector('.log-in');
  logIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = logIn.email.value;
    const password = logIn.password.value;
    logInWithEmail(email, password);
    logIn.reset();
    removeLogInModal();
  });

  const closeBtn = document.querySelector('.close-img');
  closeBtn.onclick = () => {
    removeLogInModal();
  };
}

function removeLogInModal() {
  const logInModal = document.getElementById('log-in-modal');
  header.removeChild(logInModal);
}

function createLogInButtons() {
  const logInBtns = document.createElement('div');
  logInBtns.id = 'log-in-container';
  header.appendChild(logInBtns);

  const signInBtn = document.createElement('button');
  signInBtn.id = 'sign-in-button';
  signInBtn.innerText = 'Sign In';
  logInBtns.appendChild(signInBtn);

  signInBtn.onclick = () => {
    createSignInModal();
  };

  const logInBtn = document.createElement('button');
  logInBtn.id = 'log-in-button';
  logInBtn.innerText = 'Log In';
  logInBtns.appendChild(logInBtn);

  logInBtn.onclick = () => {
    createLogInModal();
  };

  header.appendChild(logInBtns);
}

function createLogOut(user) {
  const logOutContainer = document.createElement('div');
  logOutContainer.id = 'log-out-container';
  logOutContainer.innerHTML = `<h5>Logged in as: ${user.email}</h5>
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

export function setUpNavBar(user) {
  const logOutContainer = document.getElementById('log-out-container');
  const logInBtns = document.getElementById('log-in-container');
  if (user) {
    logInBtns ? removeLogInButtons() : undefined;
    createLogOut(user);
  } else {
    logOutContainer ? removeLogOut() : undefined;
    createLogInButtons();
  }
}

export default function createNavBar() {
  // createLogInButtons();
}
