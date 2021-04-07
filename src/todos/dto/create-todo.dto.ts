import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly isDone?: boolean;
}
