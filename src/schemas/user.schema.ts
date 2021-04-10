import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  username: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: Boolean, default: false })
  googleAccount: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
