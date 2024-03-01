import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  readonly title: string;
  @IsBoolean()
  readonly completed: boolean;
}
