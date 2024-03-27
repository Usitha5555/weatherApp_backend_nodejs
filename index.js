const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const API_KEY = process.env.API_KEY;
const port = 3033;

let weatherData = {};

// Function to fetch weather data for a city
async function fetchWeatherData(city) {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = response.data;
    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;

    // Store data in weatherData object
    weatherData[cityName] = { temperature, humidity, pressure };
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
  }
}

// Route to fetch weather data for cities
app.get('/weather', async (req, res) => {
  const cities = [
    'Colombo',
    'Ratnapura',
    'Negombo',
    'Kandy',
    'Trincomalee',
    'Matara',
    'Galle',
    'Jaffna',
    'Mannar'
  ];

  // Fetch weather data for each city
  await Promise.all(cities.map(city => fetchWeatherData(city)));

  // Send weatherData as JSON response
  res.json(weatherData);
});

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
