import { url } from 'inspector';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggeroption: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NOVA MINI TS PROJECT',
      version: '1.0.0',
      description: 'Company employee relationship',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'http://localhost:6000',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'],
};

const swaggerspec = swaggerJsDoc(swaggeroption);

export default swaggerspec;
