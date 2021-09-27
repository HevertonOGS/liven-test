import AppError from "@shared/errors/AppError";

import FakeAddressRepository from "../repositories/fakes/FakeAddressRepository";
import UpdateAddressService from "./UpdateAddressService";

let fakeAddressesRepository: FakeAddressRepository;
let updateAddress: UpdateAddressService;

describe('UpdateAddress', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressRepository();

    updateAddress = new UpdateAddressService(
      fakeAddressesRepository,
    );
  });

  it('should be able update the address', async() => {
    const address = await fakeAddressesRepository.create({
      address: "João Vicente Ferreira, 100 - Jardim Tropical",
      city: "Dourados",
      state: "MS",
      country: "BR",
      postal_code: "79823-010",
      user_id: 'user-123',
    });

    const updatedAddress = await updateAddress.execute({
      address_id: address.id,
      address: "João Vicente Ferreira 100 - Jardim Tropical",
      city: "Dourados",
      state: "MS",
      country: "BR",
      postal_code: "79823-010",
    });

    expect(updatedAddress.address).toBe('João Vicente Ferreira 100 - Jardim Tropical');
    expect(updatedAddress.city).toBe('Dourados');
  });

  it('should not be able update the address from non-existing address id', async() => {
    await expect(
      updateAddress.execute({
        address_id: 'non-existing-address-id',
        address: "João Vicente Ferreira 100 - Jardim Tropical",
        city: "Dourados",
        state: "MS",
        country: "BR",
        postal_code: "79823-010",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
