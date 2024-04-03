const mongoose = require("mongoose");
const cron = require("node-cron");

const dbUrl = "mongodb+srv://Usitha:200045@cluster0.10qpzhi.mongodb.net/weatherApi";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const weatherSchema = new mongoose.Schema({
  _id: Number,
  district: String,
  humidity: Number,
  temperature: Number,
  pressure: Number,
  weatherCondition: String,
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


const generateWeatherData = async () => {
  try {
    await mongoose.connect(dbUrl, connectionParams);

    
    await Weather.deleteMany({});

    for (let i = 1; i <= districts.length; i++) {
      const district = districts[i - 1]; 
      const humidity = Math.random() * 100;
      const temperature = Math.random() * 40;
      const pressure = Math.random() * 1000 + 900;

      let weatherCondition;
      if (temperature > 25 && humidity < 60 && pressure > 1000) {
        weatherCondition = 'sunny';
      } else {
        weatherCondition = 'rainy';
      }

      const weatherData = new Weather({
        _id: i, 
        district,
        humidity,
        temperature,
        pressure,
        weatherCondition,
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


cron.schedule("* * * * *", generateWeatherData);


