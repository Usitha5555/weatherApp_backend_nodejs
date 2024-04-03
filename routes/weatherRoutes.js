// routes/weatherRoutes.js
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/", weatherController.getWeatherData);

module.exports = router;
