import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRangeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
