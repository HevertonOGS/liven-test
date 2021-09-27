import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IAddressRepository from "../repositories/IAddressRepository";

import Address from "../infra/typeorm/entities/Address";

interface IRequest {
  address_id: string;
}

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    address_id,
  }: IRequest): Promise<Address> {
    const address = await this.addressRepository.findById(address_id);

    if(!address)
      throw new AppError('Address not found.');

    return address;
  }
}

export default ShowAddressService;
