import { injectable, inject } from 'tsyringe';

import IAddressRepository from '../repositories/IAddressRepository';

import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  user_id: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({ address, city, state, country, postal_code, user_id }: IRequest): Promise<Address> {
    const addressCreated = await this.addressRepository.create({
      address,
      city,
      state,
      country,
      postal_code,
      user_id,
    });

    return addressCreated;
  }
}

export default CreateAddressService;
