import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    class mockModel {
      constructor(public data: any) {}

      save() {
        return this.data;
      }

      static findOne({ username }) {
        if (!username) return undefined;
        if (username == 'exec')
          return {
            exec: () => ({}),
          };
        return { username };
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    const result = {
      password: '',
    };
    it('should return new user', async () => {
      jest
        .spyOn(argon2, 'hash')
        .mockImplementation(async () => result.password);

      expect(
        await service.createUser({ password: 'test123' } as CreateUserDto),
      ).toStrictEqual(result);
    });
  });
  describe('createOrFindGoogleUser', () => {
    const result = {
      username: 'test@mail.com',
    };
    it('should found new User', async () => {
      expect(
        await service.createOrFindGoogleUser(result.username),
      ).toStrictEqual(result);
    });
    it('should create new User', async () => {
      expect(await service.createOrFindGoogleUser('')).toStrictEqual({
        googleAccount: true,
        username: '',
      });
    });
  });
  describe('findOne', () => {
    const result = {
      username: 'exec',
    };
    it('should found user', async () => {
      expect(await service.findOne(result.username)).toStrictEqual({});
    });
  });
});
