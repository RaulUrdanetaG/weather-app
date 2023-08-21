import searchLogo from '../assets/search-outline.svg';
import { addCity } from '../utils/firebaseApp';
const content = document.getElementById('content');

export default function createContent() {
  const contentSection = document.createElement('section');
  content.appendChild(contentSection);

  const contentGrid = document.createElement('div');
  contentGrid.id = 'content-grid';
  contentSection.appendChild(contentGrid);
}

export function updateSearchBar(user) {
  if (user) {
    const contentSection = document.querySelector('section');
    const searchCity = document.createElement('div');
    searchCity.id = 'search-city';
    searchCity.innerHTML = `<div class = 'search-form'>
                              <img src = '${searchLogo}'>
                              <form id = 'city-form'>
                                <input id = 'city-search' type = 'text' placeholder = 'search location'>
                              </form>
                            </div>
                            <div class = 'search-buttons'>
                              <button type = 'submit' form = 'city-form' id = 'search-button' class = 'city-button'>Search</button>
                              <button id = 'refresh-button' class = 'city-button'>Refresh</button>
                            </div>`;
    contentSection.appendChild(searchCity);

    const searchForm = document.querySelector('#city-form');
    const cityNameInput = document.getElementById('city-search');
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cityName = cityNameInput.value;
      addCity(cityName);
    });

  } else {
    const searchBar = document.getElementById('search-city');
    const contentSection = document.querySelector('section');

    contentSection.removeChild(searchBar);
  }
}
