import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
