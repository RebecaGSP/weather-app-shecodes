//Current Date
let date = new Date();

function formatDate() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday"
  ];
  let weekDay = weekDays[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let formattedDate = `${weekDay}, ${hour}: ${minutes}`;
  return formattedDate;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(date);

//Celsius to Farenheit
function celsiusUnits(event) {
  event.preventDefault();
  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = "27";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusUnits);

function farenheitUnits(event) {
  event.preventDefault();
  let temperature = document.querySelector("#actual-temperature");
  temperature.innerHTML = "80.6";
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", farenheitUnits);


//Week 5
//City search
function getTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  document.querySelector("#actual-temperature").innerHTML = currentTemperature;
  document.querySelector("#current-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
  let apiKey = "48b09ccbd64506cbc4fe7db34fbff847";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let citySubmit = document.querySelector("#search-form");
citySubmit.addEventListener("submit", handleSubmit);

//Bonus Feature

function handlePosition(position) {
  let apiKey = "48b09ccbd64506cbc4fe7db34fbff847";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let weatherUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(weatherUrl);
  axios.get(weatherUrl).then(getTemperature);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", displayCurrentLocation);

search("New York");