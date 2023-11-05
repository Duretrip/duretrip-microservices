import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEqualTo } from '../decorators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'minLength-{"ln":6,"count":6}',
  })
  @MaxLength(20, {
    message: 'maxLength-{"ln":20,"count":20}',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
    {
      message:
        'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    },
  )
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEqualTo('password', {
    message: 'isEqualTo-{"field":"password"}',
  })
  confirmPassword: string;

  @IsEmail()
  @IsLowercase()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
