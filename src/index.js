//Current Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekDay[date.getDay()];
  return `${day}, ${hour}:${minutes}`;
}

//Celsius to Farenheit
let celsiusTemperature = null;

function farenheitUnits(event) {
  event.preventDefault();
  document.querySelector("#celsius").classList.remove("inactive");
  document.querySelector("#farenheit").classList.add("inactive");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32; 
  document.querySelector("#actual-temperature").innerHTML = Math.round(farenheitTemperature);
}

document.querySelector("#farenheit").addEventListener("click", farenheitUnits);

function celsiusUnits(event) {
  event.preventDefault();
  document.querySelector("#farenheit").classList.remove("inactive");
  document.querySelector("#celsius").classList.add("inactive");
  document.querySelector("#actual-temperature").innerHTML = Math.round(celsiusTemperature);
}

document.querySelector("#celsius").addEventListener("click", celsiusUnits);

//City search
function getTemperature(response) {
  console.log(response.data)
  let currentTemperature = Math.round(response.data.main.temp);
  document.querySelector("#actual-temperature").innerHTML = currentTemperature;
  document.querySelector("#current-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
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

//Display current location
function handlePosition(position) {
  let apiKey = "48b09ccbd64506cbc4fe7db34fbff847";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let weatherUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(getTemperature);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", displayCurrentLocation);

search("New York");