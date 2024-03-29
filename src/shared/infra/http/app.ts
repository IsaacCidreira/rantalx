import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from '../typeorm';
import '../../container';

import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import updload from '../../../config/updload';

createConnection();
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/avatar', express.static(`${updload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${updload.tmpFolder}/cars`));
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message} `,
    });
  },
);

export { app };
