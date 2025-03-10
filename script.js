const getWeatherButton = document.getElementById('get-weather');
const cityInput = document.getElementById('city-input');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const weatherInfo = document.getElementById('weather-info');

// OpenWeatherMap API key
const apiKey = '73cb994951be9a92baa0b53fc0da77c2'; 

// Function to fetch weather data from the API
async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found!');
            return;
        }

        // Show weather data
        displayWeather(data);
    } catch (error) {
        alert('An error occurred while fetching the weather data');
    }
}

// Function to display weather data
function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Show the weather info section
    weatherInfo.style.display = 'block';
}

// Event listener for the 'Get Weather' button
getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city!');
        return;
    }

    fetchWeather(city);
});

// Event listener for the 'Enter' key to trigger the weather fetch
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') {
            fetchWeather(city);
        }
    }
});
