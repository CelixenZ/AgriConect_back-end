import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgriConnect API",
      version: "1.0.0",
      description: "API documentation for AgriConnect",
    },
  },
  apis: [path.join(__dirname, "../routes/*.ts")], // IMPORTANT FIX
};

export const swaggerSpec = swaggerJsdoc(options);
