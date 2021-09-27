import AppError from "@shared/errors/AppError";
import Address from "../infra/typeorm/entities/Address";

import FakeAddressRepository from "../repositories/fakes/FakeAddressRepository";
import ListAddressService from "./ListAddressService";

let fakeAddressRepository: FakeAddressRepository;
let listAddresses: ListAddressService;

describe('ListAddresses', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    listAddresses = new ListAddressService(
      fakeAddressRepository,
    );
  });

  it('should be able list user address', async() => {
     await fakeAddressRepository.create({
      address: 'João Vicente Ferreira, 100 - Jardim Tropical',
      city: 'Dourados',
      state: 'MS',
      country: 'BR',
      postal_code: '79823-010',
      user_id: '1',
    });

    await fakeAddressRepository.create({
      address: 'João Vicente Ferreira, 100 - Jardim Tropical',
      city: 'Dourados',
      state: 'MS',
      country: 'BR',
      postal_code: '79823-010',
      user_id: '1',
    });

    const addresses = await listAddresses.execute({
      user_id: '1',
    });

    expect(addresses[0]).toBeInstanceOf(Address);
    expect(addresses[1]).toBeInstanceOf(Address);
  });

  it('should not be able show the address from non-existing address id', async() => {
    await expect(
      listAddresses.execute({
        user_id: 'non-existing-address-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
