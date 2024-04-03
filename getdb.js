const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const WebSocket = require("ws");
const Weather = require("./models/weather"); // Import the Weather model

const app = express();
const httpPort = 3030;
const wsPort = 3031;

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const weatherRoutes = require("./routes/weatherRoutes");
app.use("/weather", weatherRoutes);

// WebSocket server
const wss = new WebSocket.Server({ port: wsPort });

// WebSocket logic
wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket server");

  // Send initial weather data
  sendWeatherData(ws);

  // Send weather data every 2 minutes
  const weatherInterval = setInterval(() => {
    sendWeatherData(ws);
  }, 2 * 60 * 1000); // 2 minutes interval

  // Close WebSocket connection when client disconnects
  ws.on("close", () => {
    clearInterval(weatherInterval);
  });
});

// Send weather data via WebSocket
const sendWeatherData = async (ws) => {
  try {
    const weatherData = await Weather.find().sort({ _id: -1 }).limit(25);
    ws.send(JSON.stringify(weatherData));
  } catch (error) {
    console.error("Error sending weather data via WebSocket:", error);
  }
};

// HTTP server
const httpServer = app.listen(httpPort, () => {
  console.log(`HTTP server is running on port ${httpPort}`);
});

// Error handling for HTTP server
httpServer.on("error", (error) => {
  console.error("HTTP server error:", error);
});

// Error handling for WebSocket server
wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});






// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const cors = require("cors");
// const WebSocket = require("ws");

// const app = express();
// const httpPort = 3030;
// const wsPort = 3031; // WebSocket server

// // MongoDB connection
// const dbUrl = "mongodb+srv://Usitha:200045@cluster0.10qpzhi.mongodb.net/weatherApi";
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

// // Weather schema and model
// const weatherSchema = new mongoose.Schema({
//   district: String,
//   humidity: Number,
//   temperature: Number,
//   pressure: Number,
// });
// const Weather = mongoose.model("Weather", weatherSchema);

// // Express middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // API endpoint to fetch weather data
// app.get("/weather", async (req, res) => {
//   try {
//     const weatherData = await Weather.find().limit(25);
//     res.json(weatherData);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching weather data", error });
//   }
// });

// // HTTP server
// const httpServer = app.listen(httpPort, () => {
//   console.log(`HTTP server is running on port ${httpPort}`);
// });

// // WebSocket server
// const wss = new WebSocket.Server({ port: wsPort });

// wss.on("connection", (ws) => {
//   console.log("Client connected to WebSocket server");

//   // Send initial weather data
//   sendWeatherData(ws);

//   // Send weather data every 2 minutes
//   const weatherInterval = setInterval(() => {
//     sendWeatherData(ws);
//   }, 2 * 60 * 1000); // 2 minutes interval

//   // Close WebSocket connection when client disconnects
//   ws.on("close", () => {
//     clearInterval(weatherInterval);
//   });
// });

// // Send weather data via WebSocket
// const sendWeatherData = async (ws) => {
//   try {
//     const weatherData = await Weather.find().limit(25);
//     ws.send(JSON.stringify(weatherData));
//   } catch (error) {
//     console.error("Error sending weather data via WebSocket:", error);
//   }
// };


// wss.on("error", (error) => {
//   console.error("WebSocket server error:", error);
// });

// httpServer.on("error", (error) => {
//   console.error("HTTP server error:", error);
// });




