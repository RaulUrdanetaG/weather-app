import searchLogo from '../assets/search-outline.svg';
import closeImg from '../assets/close-outline.svg';
import { addCity, removeCity, getUserCities } from '../utils/firebaseApp';
import { makeWeatherRequest, formatDate, formatDay } from '../utils/weatherApp';

const content = document.getElementById('content');

let units;

export default function createContent() {
  const contentSection = document.createElement('section');
  content.appendChild(contentSection);
}

export function setUnits(userUnits) {
  units = userUnits;
}

export function updateSearchBar(user) {
  if (user) {
    const contentSection = document.querySelector('section');
    const searchCity = document.createElement('div');
    searchCity.id = 'search-city';
    searchCity.innerHTML = `<div class = 'search-form'>
                              <img src = '${searchLogo}'>
                              <form id = 'city-form'>
                                <input id = 'city-search' type = 'text' placeholder = 'search location' autocomplete = 'off'>
                              </form>
                            </div>
                            <h6 class = 'error-search-text'></h6>
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

    const refreshBtn = document.getElementById('refresh-button');
    refreshBtn.onclick = () => {
      updateCitiesGrid();
    };

    const contentGrid = document.createElement('div');
    contentGrid.id = 'content-grid';
    contentSection.appendChild(contentGrid);

    updateCitiesGrid();
  } else {
    const searchBar = document.getElementById('search-city');
    const contentSection = document.querySelector('section');

    contentSection.removeChild(searchBar);

    const contentGrid = document.getElementById('content-grid');
    contentSection.removeChild(contentGrid);
  }
}

export function clearSearchForm() {
  const searchForm = document.getElementById('city-search');
  searchForm.value = '';
}

export async function createCityWeather(cityName) {
  const contentGrid = document.getElementById('content-grid');

  const cityWeather = await makeWeatherRequest(cityName);

  let tempUnits, temp, feelsLike;
  let speedUnits, speed;
  let forecastDays;
  if (units === 'metric') {
    temp = cityWeather.current.temp_c;
    speed = cityWeather.current.wind_kph;
    feelsLike = cityWeather.current.feelslike_c;
    forecastDays = [
      //starts in 1 to avoid current day
      [
        cityWeather.forecast.forecastday[1].day.maxtemp_c,
        cityWeather.forecast.forecastday[1].day.mintemp_c,
      ],
      [
        cityWeather.forecast.forecastday[2].day.maxtemp_c,
        cityWeather.forecast.forecastday[2].day.mintemp_c,
      ],
      [
        cityWeather.forecast.forecastday[3].day.maxtemp_c,
        cityWeather.forecast.forecastday[3].day.mintemp_c,
      ],
      [
        cityWeather.forecast.forecastday[4].day.maxtemp_c,
        cityWeather.forecast.forecastday[4].day.mintemp_c,
      ],
    ];

    tempUnits = '°C';
    speedUnits = 'km/h';
  }
  if (units === 'imperial') {
    temp = cityWeather.current.temp_f;
    speed = cityWeather.current.wind_mph;
    feelsLike = cityWeather.current.feelslike_f;

    forecastDays = [
      //starts in 1 to avoid current day
      [
        cityWeather.forecast.forecastday[1].day.maxtemp_f,
        cityWeather.forecast.forecastday[1].day.mintemp_f,
      ],
      [
        cityWeather.forecast.forecastday[2].day.maxtemp_f,
        cityWeather.forecast.forecastday[2].day.mintemp_f,
      ],
      [
        cityWeather.forecast.forecastday[3].day.maxtemp_f,
        cityWeather.forecast.forecastday[3].day.mintemp_f,
      ],
      [
        cityWeather.forecast.forecastday[4].day.maxtemp_f,
        cityWeather.forecast.forecastday[4].day.mintemp_f,
      ],
    ];

    tempUnits = '°F';
    speedUnits = 'mph';
  }

  const cityWeatherContainer = document.createElement('div');
  cityWeatherContainer.classList.add('city-container');
  cityWeatherContainer.id = cityName;
  contentGrid.appendChild(cityWeatherContainer);

  const closeBtn = document.createElement('img');
  closeBtn.classList.add('close-button');
  closeBtn.src = `${closeImg}`;
  cityWeatherContainer.appendChild(closeBtn);

  closeBtn.addEventListener('click', async () => {
    deleteCity(cityWeatherContainer);
  });

  const cityTitle = document.createElement('div');
  cityTitle.classList.add('city-title');
  cityTitle.innerHTML = `<h4>${cityWeather.location.name}</h4>
                         <h5>${cityWeather.location.region}</h5>
                         <h6>${cityWeather.location.country}</h6>`;

  cityWeatherContainer.appendChild(cityTitle);

  const localTime = document.createElement('h6');
  localTime.classList.add('local-time');
  localTime.innerHTML = `${formatDate(cityWeather.location.localtime)}`;
  cityWeatherContainer.appendChild(localTime);

  const currentWeather = document.createElement('div');
  currentWeather.classList.add('current-weather');
  currentWeather.innerHTML = `<div class = 'current-weather-info'>
                                <img src = '${cityWeather.current.condition.icon}'>
                                <h5>${cityWeather.current.condition.text}</h5>
                              </div>
                              <div class = 'current-temp'>
                                <h4>${temp} ${tempUnits}</h4>
                                <div>
                                  <h6>Feels like:</h6>
                                  <h5>${feelsLike} ${tempUnits}</h5>
                                </div>
                              </div>`;
  cityWeatherContainer.appendChild(currentWeather);

  const extraWeatherInfo = document.createElement('div');
  extraWeatherInfo.classList.add('extra-weather-info');
  extraWeatherInfo.innerHTML = `<div class = 'humidity'>
                                  <h6>Humidity: </h6>
                                  <h5>${cityWeather.current.humidity}%</h5>
                                </div>
                                <div class = 'rain-chance'>
                                  <h6>Cloudy: </h6>
                                  <h5>${cityWeather.current.cloud}%</h5>
                                </div>
                                <div class = 'Wind speed'>
                                  <h6>Wind speed: </h6>
                                  <h5>${speed} ${speedUnits}</h5>
                                </div>`;
  cityWeatherContainer.appendChild(extraWeatherInfo);

  const forecast = document.createElement('div');
  forecast.classList.add('forecast');
  forecast.innerHTML = `<div class = 'forecast-day'>
                          <h5>${formatDay(cityWeather.forecast.forecastday[1].date)}</h5>
                          <img src = '${cityWeather.forecast.forecastday[0].day.condition.icon
                          }'>
                          <h5 class = 'max-temp'>${forecastDays[0][0]} ${tempUnits}</h5>
                          <h6 class = 'min-temp'>${forecastDays[0][1]} ${tempUnits}</h6>
                        </div>
                        <div class = 'forecast-day'>
                          <h5>${formatDay(cityWeather.forecast.forecastday[2].date)}</h5>
                          <img src = '${
                            cityWeather.forecast.forecastday[1].day.condition.icon}'>
                          <h5 class = 'max-temp'>${forecastDays[1][0]} ${tempUnits}</h5>
                          <h6 class = 'min-temp'>${forecastDays[1][1]} ${tempUnits}</h6>
                        </div>
                        <div class = 'forecast-day'>
                          <h5>${formatDay(cityWeather.forecast.forecastday[3].date)}</h5>
                          <img src = '${
                            cityWeather.forecast.forecastday[2].day.condition.icon}'>
                          <h5 class = 'max-temp'>${forecastDays[2][0]} ${tempUnits}</h5>
                          <h6 class = 'min-temp'>${forecastDays[2][1]} ${tempUnits}</h6>
                        </div>
                        <div class = 'forecast-day'>
                          <h5>${formatDay(cityWeather.forecast.forecastday[4].date)}</h5>
                          <img src = '${cityWeather.forecast.forecastday[3].day.condition.icon}'>
                          <h5 class = 'max-temp'>${forecastDays[3][0]} ${tempUnits}</h5>
                          <h6 class = 'min-temp'>${forecastDays[3][1]} ${tempUnits}</h6>
                        </div>`;
  cityWeatherContainer.appendChild(forecast);
}

export async function updateCitiesGrid() {
  const citiesGrid = document.getElementById('content-grid');
  citiesGrid.innerHTML = '';

  const userCities = await getUserCities();

  userCities.forEach(async (city) => {
    await createCityWeather(city);
  });
}

export function handleSearchErr(clearBool) {
  const errorSearchText = document.querySelector('.error-search-text');

  clearBool
    ? (errorSearchText.innerHTML = 'Please enter a valid location')
    : (errorSearchText.innerHTML = '');
}

async function deleteCity(cityToRemove) {
  const citiesGrid = document.getElementById('content-grid');
  citiesGrid.removeChild(cityToRemove);

  const cityName = cityToRemove.id;
  console.log(cityName);

  await removeCity(cityName);
}
