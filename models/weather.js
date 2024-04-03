
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  district: String,
  humidity: Number,
  temperature: Number,
  pressure: Number,
  weatherCondition: String,
});

module.exports = mongoose.model('Weather', weatherSchema);
