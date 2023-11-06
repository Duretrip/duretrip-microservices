import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * forget password data transfer object
 */
export class ForgetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
