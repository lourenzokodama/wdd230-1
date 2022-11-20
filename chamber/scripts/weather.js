const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const wind_speed = document.querySelector('#wind-speed');
const wind_chill = document.querySelector('#feels-like');

const url = `https://api.openweathermap.org/data/2.5/weather?zip=97741,us&units=imperial&appid=33e21c071ddd9d8ad6330516b69de4b7`;

apiFetch(url);

async function apiFetch(apiURL) {
  try {
    const response = await fetch(apiURL);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function windChill(current_temperature, wind_speed){

  let windChillCalculator = 35.74 + 0.6215 * current_temperature - 35.75 * Math.pow(wind_speed, 0.16) + 0.4275 * current_temperature *  Math.pow(wind_speed, 0.16);
  console.log(windChillCalculator);

  windChillCalculator = Math.floor(windChillCalculator);

  windChillCalculator = (windChillCalculator > current_temperature) ? current_temperature : windChillCalculator;

  console.log(windChillCalculator);

  return windChillCalculator;
}

function  displayResults(weatherData) {
  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = toTitleCase(weatherData.weather[0].description);
  

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}


function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

