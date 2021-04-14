import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [AuthController],
  //     providers: [
  //       AuthService,
  //       {
  //         provide: getModelToken('User'),
  //         useValue: {},
  //       },
  //       UsersService,
  //       JwtService,
  //     ],
  //     imports: [
  //       JwtModule.register({
  //         secret: process.env.JWT_SECRET,
  //         signOptions: { expiresIn: '1h' },
  //       }),
  //     ],
  //   }).compile();

  //   controller = module.get<AuthController>(AuthController);
  // });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
