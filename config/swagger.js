const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Esmae API',
      version: '1.0.0',
      description: 'Documentación de la API para la tienda de espejos Esmae',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'], // Documenta desde comentarios en tus rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
