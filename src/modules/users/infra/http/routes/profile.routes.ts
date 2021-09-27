import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAutenticated from '../middlewares/ensureAutenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAutenticated);

profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  }
}), profileController.update);
profileRouter.get('/', profileController.show);
profileRouter.delete('/', profileController.delete);

export default profileRouter;
