import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAddressService from '@modules/address/services/CreateAddressService';
import UpdateAddressService from '@modules/address/services/UpdateAddressService';
import ShowAddressService from '@modules/address/services/ShowAddressService';
import ListAddressService from '@modules/address/services/ListAddressService';
import DeleteAddressService from '@modules/address/services/DeleteAddressService';

interface Address {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export default class AddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { address, city, state, country, postal_code, user_id } = request.body;

    const createAddress = container.resolve(CreateAddressService);

    const addressCreated: Address = await createAddress.execute({
      address,
      city,
      state,
      country,
      postal_code,
      user_id,
    });

    return response.json(classToClass(addressCreated));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const address_id = request.params.id;

    const showAddress = container.resolve(ShowAddressService);

    const address: Address = await showAddress.execute({ address_id });

    return response.json(classToClass(address));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAddress = container.resolve(ListAddressService);

    const address: Address[] = await listAddress.execute({
      user_id
    });

    return response.json(classToClass(address));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const address_id = request.params.id;
    const { address, city, state, country, postal_code } = request.body;

    const updateAddress = container.resolve(UpdateAddressService);

    const addressUpdated: Address = await updateAddress.execute({
      address_id,
      address,
      city,
      state,
      country,
      postal_code,
    });

    return response.json(classToClass(addressUpdated));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const address_id = request.params.id;

    const deleteAddress = container.resolve(DeleteAddressService);

    const address: Address = await deleteAddress.execute({ address_id });

    return response.json(classToClass(address));
  }
}
