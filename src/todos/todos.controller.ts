import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { IdOnlyTodoDto } from './dto/id-only-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param() idOnlyTodoDto: IdOnlyTodoDto) {
    return this.todosService.findOne(idOnlyTodoDto);
  }

  @Patch(':id')
  update(
    @Param() idOnlyTodoDto: IdOnlyTodoDto,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(idOnlyTodoDto, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('') idOnlyTodoDto: IdOnlyTodoDto) {
    return this.todosService.remove(idOnlyTodoDto);
  }
  @Delete()
  removeCompleted() {
    return this.todosService.removeCompleted();
  }
}
