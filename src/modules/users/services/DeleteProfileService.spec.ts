import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import DeleteProfileService from './DeleteProfileService';

let fakeUsersRepository: FakeUsersRepository;
let deleteProfile: DeleteProfileService;

describe('DeleteProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteProfile = new DeleteProfileService(
      fakeUsersRepository,
    );
  });

  it('should be able delete the profile', async() => {
    const user = await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'john@wwe.fight',
      phone: '67 9999-4040',
      password: 'ilovereymisterio'
    });

    const profile = await deleteProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Cena');
    expect(profile.email).toBe('john@wwe.fight');
    expect(profile.phone).toBe('67 9999-4040');
  });

  it('should not be able delete the profile from non-existing user', async() => {
    await expect(
      deleteProfile.execute({
        user_id: 'non-existing-user-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
