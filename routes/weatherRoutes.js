// routes/weatherRoutes.js

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather data operations
 */

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get weather data
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 */
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Weather:
 *       type: object
 *       properties:
 *         district:
 *           type: string
 *         humidity:
 *           type: number
 *         temperature:
 *           type: number
 *         pressure:
 *           type: number
 *         weatherCondition:
 *           type: string
 */

router.get("/", weatherController.getWeatherData);

module.exports = router;
