let apiKey = "905addfdd47350a84b1fff2eb7da7fbb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`;

axios.get(`${apiUrl}${apiKey}&&units=metric`).then(showTemt);
