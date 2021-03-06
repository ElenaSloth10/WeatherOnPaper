"use strict";

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastIndicator = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDays, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col forecastDay">
            <h4>${formatDay(forecastDays.dt)}</h4>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDays.weather[0].icon
              }@2x.png"
              alt=""
              width="50"
            />
            <p class="days-temp-all">
              <span class="days-temp-max">${Math.round(
                forecastDays.temp.max
              )}</span>° / 
              <span class="days-temp-min">${Math.round(
                forecastDays.temp.min
              )}</span>°
            </p>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastIndicator.innerHTML = forecastHTML;
}

function getForecast(coordinats) {
  let apiKey = "905addfdd47350a84b1fff2eb7da7fbb";
  let apiUrlC = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinats.lat}&lon=${coordinats.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlC).then(displayForecast);
}

function showTemt(response) {
  let temperatureIndicator = document.querySelector("#temperature");
  temperatureIndicator.innerHTML = Math.round(response.data.main.temp);
  let cityIndicator = document.querySelector("h1");
  cityIndicator.innerHTML = response.data.name;
  let weatherSkyIndicator = document.querySelector("#weatherSky");
  weatherSkyIndicator.innerHTML = response.data.weather[0].main;
  let humidityIndicator = document.querySelector("#humidity");
  humidityIndicator.innerHTML = response.data.main.humidity;
  let windIndicator = document.querySelector("#wind");
  windIndicator.innerHTML = Math.round(response.data.wind.speed);
  let dateIndicator = document.querySelector("h3");

  dateIndicator.innerHTML = formatDate(response.data.dt * 1000);

  let skyIconIndicator = document.querySelector("#skyIcon");
  skyIconIndicator.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  skyIconIndicator.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "905addfdd47350a84b1fff2eb7da7fbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`;

  axios.get(`${apiUrl}${apiKey}&units=${units}`).then(showTemt);
}

function submitIndicator(event) {
  event.preventDefault();
  let cityChekIndicator = document.querySelector("#cityChek");
  search(cityChekIndicator.value);
}

function showCelsius(event) {
  event.preventDefault();
  units = "metric";
  celsiusIndicator.classList.add("active");
  fahrenheitIndicator.classList.remove("active");
  search(document.querySelector("h1").textContent);
}

function showFahrenheit(event) {
  event.preventDefault();
  units = "imperial";
  celsiusIndicator.classList.remove("active");
  fahrenheitIndicator.classList.add("active");
  search(document.querySelector("h1").textContent);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitIndicator);

let celsiusIndicator = document.querySelector("#celsius");
celsiusIndicator.addEventListener("click", showCelsius);

let fahrenheitIndicator = document.querySelector("#fahrenheit");
fahrenheitIndicator.addEventListener("click", showFahrenheit);

function retrievePosition(position) {
  let apiKey = "905addfdd47350a84b1fff2eb7da7fbb";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
    )
    .then(showTemt);
}

function buttonClick(specialButtonClick) {
  specialButtonClick = document.querySelector("button");

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", buttonClick);

let units = "metric";

search("Porto");
