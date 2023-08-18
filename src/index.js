import signInWithGoogle from './utils/googleAuth';

const body = document.querySelector('body');
const button = document.createElement('button');
button.innerText = 'sign up with google';

body.appendChild(button);

button.onclick = () => {
  signInWithGoogle();
};
