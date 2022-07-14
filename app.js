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
    if (index < 6) {
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
            <p>
              <span class="days-temp-max">${Math.round(
                forecastDays.temp.max
              )}</span>°
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
  console.log(coordinats);
  let apiKey = "905addfdd47350a84b1fff2eb7da7fbb";
  let apiUrlC = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinats.lat}&lon=${coordinats.lon}&appid=${apiKey}&units=metric`;
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

  axios.get(`${apiUrl}${apiKey}&&units=metric`).then(showTemt);
}

function submitIndicator(event) {
  event.preventDefault();
  let cityChekIndicator = document.querySelector("#cityChek");
  search(cityChekIndicator.value);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusIndicator.classList.add("active");
  fahrenheitIndicator.classList.remove("active");
  let temperatureIndicator = document.querySelector("#temperature");
  temperatureIndicator.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusIndicator.classList.remove("active");
  fahrenheitIndicator.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperatureIndicator = document.querySelector("#temperature");
  temperatureIndicator.innerHTML = fahrenheitTemp;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitIndicator);

let celsiusIndicator = document.querySelector("#celsius");
celsiusIndicator.addEventListener("click", showCelsius);

let fahrenheitIndicator = document.querySelector("#fahrenheit");
fahrenheitIndicator.addEventListener("click", showFahrenheit);

search("London");
