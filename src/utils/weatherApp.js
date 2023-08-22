import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

const weatherAPIkey = '4f78200260bd4b4f8f8180319231608';

export async function makeWeatherRequest(cityName) {
  if (cityName.includes(' ')) {
    cityName = cityName.replace(/\s+/g, '-'); //replace spaces with dash
  }
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${cityName}&days=5`,
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

export function formatDate(date) {
  const formatedDate = new Date(date);
  return format(formatedDate, 'iii | dd MMM yyyy | hh:mmaaa');
}

export function formatDay(date) {
  const formatedDate = new Date(date);
  const correctedDate = addDays(formatedDate, 1);
  return format(correctedDate, 'iii');
}
