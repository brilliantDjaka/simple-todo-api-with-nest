import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoDocument, Todo } from '../schemas/todo.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
  create(createTodoDto: CreateTodoDto) {
    const createTodo = new this.todoModel(createTodoDto);
    return createTodo.save();
  }

  findAll() {
    return this.todoModel.find().exec();
  }

  findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, { $set: updateTodoDto });
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
  removeCompleted() {
    return this.todoModel.deleteMany({ isDone: true });
  }
}
