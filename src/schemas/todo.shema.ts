import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ type: String, default: '', trim: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  isDone: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: any;
}

export const TodoScema = SchemaFactory.createForClass(Todo);
