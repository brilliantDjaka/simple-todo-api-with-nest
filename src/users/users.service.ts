import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne(username: string) {
    return this.userModel.findOne({ username }).exec();
  }
  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await argon2.hash(createUserDto.password);
    const user = new this.userModel(createUserDto);
    return await user.save();
  }
}
