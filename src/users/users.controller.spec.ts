import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let services: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    services = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('should return new user', async () => {
      const result = {
        username: '',
        password: '',
        googleAccount: false,
      };
      jest
        .spyOn(services, 'createUser')
        .mockImplementation(async () => result as UserDocument);

      expect(await controller.create({} as CreateUserDto)).toBe(result);
    });
  });
});
