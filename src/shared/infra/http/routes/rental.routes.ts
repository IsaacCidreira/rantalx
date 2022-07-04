import { Router } from 'express';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const reantalRoutes = Router();

const createRentalController = new CreateRentalController();

reantalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export { reantalRoutes };
