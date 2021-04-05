import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoScema, Todo } from '../schemas/todo.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoScema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
