// 1. Put your API key here
const API_KEY = "3fb182f18c58c4f4bb08aef565d0a0cc";

// 2. Get all needed DOM elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const messageDiv = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");
const locationEl = document.getElementById("location");
const iconEl = document.getElementById("icon");
const mainConditionEl = document.getElementById("mainCondition");
const descriptionEl = document.getElementById("description");
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");


// 3. When button is clicked, call getWeather
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    showMessage("Please enter a city name.");
    hideWeatherCard();
    return;
  }

  getWeather(city);
});

// 4. Also allow pressing "Enter" in the input
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

// 5. Function to show messages (errors, etc.)
function showMessage(text) {
  messageDiv.textContent = text;
}

// 6. Hide the weather card
function hideWeatherCard() {
  weatherCard.classList.add("hidden");
}

// 7. Show the weather card
function showWeatherCard() {
  weatherCard.classList.remove("hidden");
}

// 8. Main async function to fetch weather
async function getWeather(city) {
  showMessage("Loading...");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // e.g., city not found or API error
      showMessage("City not found or error from API. Try again.");
      hideWeatherCard();
      return;
    }

    const data = await response.json();
    showMessage(""); // clear message on success
    updateWeatherUI(data);
  } catch (error) {
    console.error(error);
    showMessage("Something went wrong. Please check your internet and try again.");
    hideWeatherCard();
  }
}

// 9. Update the HTML with the API data
function updateWeatherUI(data) {
  const cityName = data.name;
  const country = data.sys.country;
  const mainCondition = data.weather[0].main;        // e.g. "Clouds"
  const description = data.weather[0].description;   // e.g. "scattered clouds"
  const temp = data.main.temp;                       // °C
  const feelsLike = data.main.feels_like;            // °C
  const humidity = data.main.humidity;               // %
  const windSpeed = data.wind.speed;                 // m/s
  const iconCode = data.weather[0].icon;             // e.g. "04d"
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  locationEl.textContent = `${cityName}, ${country}`;
  mainConditionEl.textContent = mainCondition;
  descriptionEl.textContent = description;
  temperatureEl.textContent = `Temperature: ${temp.toFixed(1)} °C`;
  feelsLikeEl.textContent = `Feels like: ${feelsLike.toFixed(1)} °C`;
  humidityEl.textContent = `Humidity: ${humidity}%`;
  windEl.textContent = `Wind: ${windSpeed} m/s`;

  iconEl.src = iconUrl;
  iconEl.alt = description;

  showWeatherCard();
}
