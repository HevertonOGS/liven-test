import { getRepository, Repository, Not } from 'typeorm';

import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';

import Address from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);

    return address;
  }

  public async find(user_id: string, city?: string, state?: string, country?: string, postal_code?: string): Promise<Address[] | undefined> {
    const addresses = await this.ormRepository.find({
      where: {
        user_id: user_id,
      }
    });

    return addresses;
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(addressData);

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async delete(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);

    this.ormRepository.delete(id);

    return address;
  }
}

export default AddressRepository;
