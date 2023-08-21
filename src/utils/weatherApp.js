const weatherAPIkey = '4f78200260bd4b4f8f8180319231608';

export async function makeWeatherRequest(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${cityName}`,
      { mode: 'cors' }
    );
    const weatherInfo = await response.json();
    return weatherInfo;
  } catch (error) {
    console.log(error);
  }
}

export async function checkCityExistance(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${cityName}`,
      { mode: 'cors' }
    );
    const data = await response.json();
    return data.error ? false : true; 
  } catch (error) {
    console.log(error);
  }
}
