import { getRepository, Repository, Not } from 'typeorm';

import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';
import IListAddressDTO from '@modules/address/dtos/IListAddressDTO';

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

  public async find(dataAddress: IListAddressDTO): Promise<Address[] | undefined> {
    let querySearchAddress = {
      user_id: dataAddress.user_id
    };

    if(dataAddress.city !== 'undefined') Object.assign(querySearchAddress, { city: dataAddress.city });
    if(dataAddress.state !== 'undefined') Object.assign(querySearchAddress, { state: dataAddress.state });
    if(dataAddress.country !== 'undefined') Object.assign(querySearchAddress, { country: dataAddress.country });
    if(dataAddress.postal_code !== 'undefined') Object.assign(querySearchAddress, { postal_code: dataAddress.postal_code });

    const addresses = await this.ormRepository.find({
      where: querySearchAddress
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
