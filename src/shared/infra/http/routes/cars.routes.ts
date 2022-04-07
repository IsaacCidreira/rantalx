import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';

const carsRoutes = Router();

const createCarContoller = new CreateCarController();

carsRoutes.post('/', createCarContoller.handle);

export { carsRoutes };
