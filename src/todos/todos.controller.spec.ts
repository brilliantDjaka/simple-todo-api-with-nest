import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Query } from 'mongoose';
import { TodoDocument } from 'src/schemas/todo.shema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { IdOnlyTodoDto } from './dto/id-only-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let services: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        TodosService,
        {
          provide: getModelToken('Todo'),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    services = module.get<TodosService>(TodosService);
  });

  describe('create', () => {
    it('should create new todo', async () => {
      const result = {};
      jest
        .spyOn(services, 'create')
        .mockImplementation(async () => result as TodoDocument);

      expect(
        await controller.create(
          {
            title: '',
            description: '',
            isDone: true,
          } as CreateTodoDto,
          {},
        ),
      ).toBe(result);
    });
  });
  describe('findAll', () => {
    it('should found todo', async () => {
      const result = [];
      jest
        .spyOn(services, 'findAll')
        .mockImplementation(async () => result as TodoDocument[]);

      expect(await controller.findAll({})).toBe(result);
    });
  });
  describe('findOne', () => {
    it('should found todo', async () => {
      const result = {};
      jest
        .spyOn(services, 'findOne')
        .mockImplementation(async () => result as TodoDocument);

      expect(await controller.findOne({} as IdOnlyTodoDto)).toBe(result);
    });
  });
  describe('update', () => {
    it('should found todo', async () => {
      const result = {};
      jest
        .spyOn(services, 'update')
        .mockImplementation(async () => result as TodoDocument);

      expect(
        await controller.update({} as IdOnlyTodoDto, {} as UpdateTodoDto),
      ).toBe(result);
    });
  });
  describe('remove', () => {
    it('should found todo', async () => {
      const result = {};
      jest
        .spyOn(services, 'remove')
        .mockImplementation(
          () =>
            result as Query<TodoDocument, TodoDocument, Record<string, never>>,
        );

      expect(await controller.remove({} as IdOnlyTodoDto)).toBe(result);
    });
  });
  describe('removeCompleted', () => {
    it('should found todo', async () => {
      const result = {};
      jest
        .spyOn(services, 'removeCompleted')
        .mockImplementation(() => result as Query<any, any, any>);

      expect(await controller.removeCompleted({} as IdOnlyTodoDto)).toBe(
        result,
      );
    });
  });
});
