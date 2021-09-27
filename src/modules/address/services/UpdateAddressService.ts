import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IAddressRepository from "../repositories/IAddressRepository";

import Address from "../infra/typeorm/entities/Address";

interface IRequest {
  address_id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute({
    address_id,
    address,
    city,
    state,
    country,
    postal_code,
  }: IRequest): Promise<Address> {
    const addressToUpdate = await this.addressesRepository.findById(address_id);

    if(!addressToUpdate)
      throw new AppError('Address not found.');

    addressToUpdate.address = address;
    addressToUpdate.city = city;
    addressToUpdate.state = state;
    addressToUpdate.country = country;
    addressToUpdate.postal_code = postal_code;

    return this.addressesRepository.save(addressToUpdate);
  }
}

export default UpdateAddressService;
