import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoDocument, Todo } from '../schemas/todo.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdOnlyTodoDto } from './dto/id-only-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
  create(createTodoDto: CreateTodoDto) {
    const createTodo = new this.todoModel(createTodoDto);
    return createTodo.save();
  }

  async findAll() {
    return (await this.todoModel.find().exec()) || [];
  }

  async findOne(findByIdTodoDto: IdOnlyTodoDto): Promise<Todo> {
    const todo = await this.todoModel.findById(findByIdTodoDto.id).exec();
    if (!todo) {
      throw new HttpException(
        "Can't find todo with this id",
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  async update(
    idOnlyTodoDto: IdOnlyTodoDto,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoModel
      .findByIdAndUpdate(idOnlyTodoDto.id, {
        $set: updateTodoDto,
      })
      .exec();
  }

  remove(idOnlyTodoDto: IdOnlyTodoDto) {
    return this.todoModel.findByIdAndDelete(idOnlyTodoDto.id);
  }
  removeCompleted() {
    return this.todoModel.deleteMany({ isDone: true });
  }
}
