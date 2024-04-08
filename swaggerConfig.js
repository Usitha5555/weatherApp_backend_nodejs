const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather Data API',
      version: '1.0.0',
      description: 'API documentation for weather data endpoints',
    },
    servers: [
      {
        // url: 'http://localhost:3030', 
        url: 'https://weatherapp-backend-nodejs.onrender.com',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
