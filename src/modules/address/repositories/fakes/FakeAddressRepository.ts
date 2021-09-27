import { v4 as uuid } from 'uuid';

import IAddressRepository from '../IAddressRepository';
import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';

import Address from '../../infra/typeorm/entities/Address';

class FakeAddresssRepository implements IAddressRepository {
  private addresses: Address[] = [];

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = this.addresses.find(address => address.id === id);

    return findAddress;
  }

  public async find(user_id: string): Promise<Address[] | undefined> {
    const findAddress = this.addresses.filter(address => address.user_id === user_id);

    return findAddress;
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, { id: uuid() }, addressData);

    this.addresses.push(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(findAddress => findAddress.id === address.id);

    this.addresses[findIndex] = address;

    return address;
  }

  public async delete(id: string): Promise<Address> {
    const findIndex = this.addresses.findIndex(findAddress => findAddress.id === id);
    const address = this.addresses[findIndex];

    this.addresses.splice(findIndex, 1);

    return address;
  }
}

export default FakeAddresssRepository;
