import { ObjectId } from 'mongoose';
import { IsObjectId } from '../../custom-decorators/validation.decorators';

export class JwtDto {
  readonly username: string;

  @IsObjectId()
  readonly userId: ObjectId;
}
