import FakeAddressRepository from "../repositories/fakes/FakeAddressRepository";
import CreateAddressService from "./CreateAddressService";

let fakeAddressesRepository: FakeAddressRepository;
let createAddress: CreateAddressService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressRepository();

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
    );
  });

  it('should be able to create a new address', async() => {
    const address = await createAddress.execute({
      address: 'João Vicente Ferreira, 100 - Jardim Tropical',
      city: 'Dourados',
      state: 'MS',
      country: 'BR',
      postal_code: '79823-010',
      user_id: '1',
    });

    expect(address).toHaveProperty('id');
  });
})
