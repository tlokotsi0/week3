const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'User API',
    description: 'An API for storing, retrieving, updating, and deleting user information.'
  },
  

  host: 'week3-q9vz.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);