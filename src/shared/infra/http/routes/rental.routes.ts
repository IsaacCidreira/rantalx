import { Router } from 'express';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalByUserController } from '../../../../modules/rentals/useCases/listRentalsByUser/ListRentalByUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const reantalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalByUserController();

reantalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
reantalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

reantalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { reantalRoutes };
