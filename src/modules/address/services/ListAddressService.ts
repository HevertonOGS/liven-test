import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IAddressRepository from "../repositories/IAddressRepository";

import Address from "../infra/typeorm/entities/Address";

interface IRequest {
  user_id: string;
  country?: string;
  city?: string;
  state?: string;
  postal_code?: string;
}

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<Address[]> {
    const addresses = await this.addressRepository.find(user_id);

    if(!addresses || addresses.length === 0)
      throw new AppError('No address found.');

    return addresses;
  }
}

export default ShowAddressService;
