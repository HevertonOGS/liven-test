import Address from "../infra/typeorm/entities/Address";

import ICreateAddressDTO from "../dtos/ICreateAddressDTO";
import IListAddressDTO from "../dtos/IListAddressDTO";

export default interface IAddressRepository {
  findById(id: string): Promise<Address | undefined>;
  find(data: IListAddressDTO): Promise<Address[] | undefined>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  delete(id: string): Promise<Address | undefined>;
}
