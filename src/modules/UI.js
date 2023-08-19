import createNavBar from './nav-bar';
import titleLogo from '../assets/partly_cloudy_day.svg';

export default function loadHome() {
  const titleImg = document.querySelector('link[rel="icon"]');
  titleImg.href = titleLogo;

  createNavBar();
}
