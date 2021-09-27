import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IAddressRepository from "../repositories/IAddressRepository";

import Address from "../infra/typeorm/entities/Address";

interface IRequest {
  address_id: string;
}

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute({
    address_id,
  }: IRequest): Promise<Address> {
    const address = await this.addressesRepository.delete(address_id);

    if(!address)
      throw new AppError('Address not founded.');

    return address;
  }
}

export default DeleteAddressService;
