import { ObjectId } from 'mongoose';
import { IsObjectId } from '../../custom-decorators/validation.decorators';
export class IdOnlyTodoDto {
  @IsObjectId()
  readonly id: ObjectId;
}
