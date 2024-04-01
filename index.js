const { default: mongoose } = require("mongoose")

const dbUrl = "mongodb+srv://Usitha:200045@cluster0.10qpzhi.mongodb.net/weatherApi"

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const weatherSchema = new mongoose.Schema({
  district: String,
  humidity: Number,
  temperature: Number,
  pressure: Number,
});

const Weather = mongoose.model("Weather", weatherSchema);

const districts = [
  "Batticaloa",
  "Anuradhapura",
  "Trincomalee",
  "Galle",
  "Mullaitivu",
  "Mannar",
  "Kegalle",
  "Matara",
  "Vavuniya",
  "Ratnapura",
  "Kandy",
  "Monaragala",
  "Jaffna",
  "Badulla",
  "Matale",
  "Nuwara Eliya",
  "Gampaha",
  "Kilinochchi",
  "Ampara",
  "Polonnaruwa",
  "Colombo",
  "Hambantota",
  "Kurunegala",
  "Puttalam",
  "Kalutara",
];

// Generate and save weather data for each district
const generateWeatherData = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const district of districts) {
      const weatherData = new Weather({
        district,
        humidity: Math.random() * 100, // Generate random humidity between 0 and 100
        temperature: Math.random() * 40, // Generate random temperature between 0 and 40
        pressure: Math.random() * 1000 + 900, // Generate random pressure between 900 and 1900
      });

      await weatherData.save();
      console.log(`Weather data saved for ${district}`);
    }

    console.log("All weather data saved successfully.");
  } catch (error) {
    console.error("Error saving weather data:", error);
  } finally {
    mongoose.disconnect();
  }
};
generateWeatherData();















// const express = require('express');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const API_KEY = process.env.API_KEY;
// const port = 3033;

// let weatherData = {};

// // Function to fetch weather data for a city
// async function fetchWeatherData(city) {
//   try {
//     const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
//     const data = response.data;
//     const cityName = data.name;
//     const temperature = data.main.temp;
//     const humidity = data.main.humidity;
//     const pressure = data.main.pressure;

//     // Store data in weatherData object
//     weatherData[cityName] = { temperature, humidity, pressure };
//   } catch (error) {
//     console.error(`Error fetching weather data for ${city}:`, error);
//   }
// }

// // Route to fetch weather data for cities
// app.get('/weather', async (req, res) => {
//   const cities = [
//     'Colombo',
//     'Ratnapura',
//     'Negombo',
//     'Kandy',
//     'Trincomalee',
//     'Matara',
//     'Galle',
//     'Jaffna',
//     'Mannar'
//   ];

//   // Fetch weather data for each city
//   await Promise.all(cities.map(city => fetchWeatherData(city)));

//   // Send weatherData as JSON response
//   res.json(weatherData);
// });

// app.listen(port, () => {
//   console.log(`Application is running on port ${port}`);
// });
