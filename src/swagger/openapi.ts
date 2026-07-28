import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "SHAHEEN-YS Backend API",
      version: "1.0.0",
      description: "Production REST API"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    "./src/**/*.ts"
  ]
};

export const openApiSpec = swaggerJSDoc(options as any);
