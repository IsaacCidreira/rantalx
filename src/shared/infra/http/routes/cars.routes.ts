import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/updload';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationsController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController';
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarContoller = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecifcationController = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImageController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarContoller.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecifcationController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
