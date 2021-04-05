import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly description?: string;

  @IsBoolean()
  readonly isDone?: boolean;
}
