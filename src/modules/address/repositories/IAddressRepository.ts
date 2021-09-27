import Address from "../infra/typeorm/entities/Address";

import ICreateAddressDTO from "../dtos/ICreateAddressDTO";

export default interface IAddressRepository {
  findById(id: string): Promise<Address | undefined>;
  find(user_id: string): Promise<Address[] | undefined>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  delete(id: string): Promise<Address | undefined>;
}
