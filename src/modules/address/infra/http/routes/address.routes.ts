import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAutenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';

import AddressController from '../controllers/AddressController';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.use(ensureAutenticated);

addressRouter.post('/', addressController.create);
addressRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string().required(),
  }
}), addressController.update);
addressRouter.get('/:id', addressController.show);
addressRouter.get('/', addressController.list);
addressRouter.delete('/:id', addressController.delete);

export default addressRouter;
