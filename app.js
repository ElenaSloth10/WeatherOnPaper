function showTemt(response) {
  console.log(response);
  let temperatureIndicator = document.querySelector("#temperature");
  temperatureIndicator.innerHTML = Math.round(response.data.main.temp);
  let cityIndicator = document.querySelector("h1");
  cityIndicator.innerHTML = response.data.name;
  let weatherSkyIndicator = document.querySelector("#weatherSky");
  weatherSkyIndicator.innerHTML = response.data.weather[0].description;
  let humidityIndicator = document.querySelector("#humidity");
  humidityIndicator.innerHTML = response.data.main.humidity;
  let windIndicator = document.querySelector("#wind");
  windIndicator.innerHTML = Math.round(response.data.wind.speed);
}

let city = "Paris";
let apiKey = "905addfdd47350a84b1fff2eb7da7fbb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`;

axios.get(`${apiUrl}${apiKey}&&units=metric`).then(showTemt);
