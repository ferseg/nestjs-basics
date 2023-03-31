import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthServivce } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthServivce;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthServivce,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthServivce);
  });

  it('Can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('Creates an user with a hashed password', async () => {
    const rawPw = 'some-pass';
    const user = await service.singup('email@em.com', rawPw);
    expect(user.password).not.toEqual(rawPw);
    const [salt, password] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(password).toBeDefined();

    const hashedPw = await service.hashPassword(rawPw, salt);
    expect(user.password).toEqual(hashedPw);
  });

  it('Thorws an error when user singns up with an already used email', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'email', password: '' }]);
    await expect(service.singup('email', '')).rejects.toThrow(
      ConflictException,
    );
  });
});
