import 'reflect-metadata';

import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter     from '@modules/users/infra/http/routes/sessions.routes';
import addressRouter from '@modules/address/infra/http/routes/address.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/user/address', addressRouter);

export default routes;
