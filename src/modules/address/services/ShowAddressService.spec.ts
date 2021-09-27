import AppError from "@shared/errors/AppError";

import FakeAddressRepository from "../repositories/fakes/FakeAddressRepository";
import ShowAddressService from "./ShowAddressService";

let fakeAddressRepository: FakeAddressRepository;
let showAddress: ShowAddressService;

describe('ShowAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    showAddress = new ShowAddressService(
      fakeAddressRepository,
    );
  });

  it('should be able show the address', async() => {
    const address = await fakeAddressRepository.create({
      address: 'João Vicente Ferreira, 100 - Jardim Tropical',
      city: 'Dourados',
      state: 'MS',
      country: 'BR',
      postal_code: '79823-010',
      user_id: '1',
    });

    const addressShow = await showAddress.execute({
      address_id: address.id,
    });

    expect(addressShow.address).toBe('João Vicente Ferreira, 100 - Jardim Tropical');
    expect(addressShow.city).toBe('Dourados');
    expect(addressShow.state).toBe('MS');
  });

  it('should not be able show the address from non-existing address id', async() => {
    await expect(
      showAddress.execute({
        address_id: 'non-existing-address-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
