import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { IdOnlyTodoDto } from './dto/id-only-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todosService.create(createTodoDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user);
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
  removeCompleted(@Request() req) {
    return this.todosService.removeCompleted(req.user);
  }
}
