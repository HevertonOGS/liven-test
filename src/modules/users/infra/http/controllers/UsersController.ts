import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

interface User {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user: User = await createUser.execute({
      name,
      email,
      phone,
      password,
    });

    return response.json(classToClass(user));
  }
}
