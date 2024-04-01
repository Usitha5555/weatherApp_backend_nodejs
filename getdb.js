const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3030;

// const dbUrl = process.env.MONGODB_URI;
const dbUrl = "mongodb+srv://Usitha:200045@cluster0.10qpzhi.mongodb.net/weatherApi"
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const weatherSchema = new mongoose.Schema({
  district: String,
  humidity: Number,
  temperature: Number,
  pressure: Number,
});
const Weather = mongoose.model("Weather", weatherSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Allow Cross-Origin Resource Sharing

// API endpoint to fetch weather data
app.get("/weather", async (req, res) => {
  try {
    const weatherData = await Weather.find().limit(25);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
