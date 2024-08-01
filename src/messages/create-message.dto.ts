import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  data: string;

  @IsNumber()
  user: number;

  @IsNumber()
  group: number;
}
