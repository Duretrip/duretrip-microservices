import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MakePaymentDto {
  // @IsNotEmpty()
  // @IsNumber()
  // userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;
}
