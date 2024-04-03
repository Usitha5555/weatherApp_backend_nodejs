const Weather = require("../models/weather");

exports.getWeatherData = async (req, res) => {
  try {
    // const weatherData = await Weather.find().limit(25);
    const weatherData = await Weather.find().sort({ _id: -1 }).limit(25);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data", error });
  }
};