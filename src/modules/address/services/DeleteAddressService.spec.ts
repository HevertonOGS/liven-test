import AppError from "@shared/errors/AppError";

import FakeAddressRepository from "../repositories/fakes/FakeAddressRepository";
import DeleteAddressService from './DeleteAddressService';

let fakeAddressRepository: FakeAddressRepository;
let deleteAddress: DeleteAddressService;

describe('DeleteAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    deleteAddress = new DeleteAddressService(
      fakeAddressRepository,
    );
  });

  it('should be able delete the address', async() => {
    const address = await fakeAddressRepository.create({
      address: 'João Vicente Ferreira, 100 - Jardim Tropical',
      city: 'Dourados',
      state: 'MS',
      country: 'BR',
      postal_code: '79823-010',
      user_id: '1',
    });

    const addressDeleted = await deleteAddress.execute({
      address_id: address.id,
    });

    expect(addressDeleted.address).toBe('João Vicente Ferreira, 100 - Jardim Tropical');
    expect(addressDeleted.city).toBe('Dourados');
    expect(addressDeleted.state).toBe('MS');
  });

  it('should not be able delete the address from non-existing address id', async() => {
    await expect(
      deleteAddress.execute({
        address_id: 'non-existing-address-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
