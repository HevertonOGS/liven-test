import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileService from "./ShowProfileService";

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository,
    );
  });

  it('should be able show the profile', async() => {
    const user = await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'john@wwe.fight',
      phone: '67 9999-4040',
      password: 'ilovereymisterio'
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Cena');
    expect(profile.email).toBe('john@wwe.fight');
    expect(profile.phone).toBe('67 9999-4040');
  });

  it('should not be able show the profile from non-existing user', async() => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
