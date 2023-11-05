import { IsEmail } from 'class-validator';
import { User } from '@dare/auth/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RoleType, UserStatusType } from '../enum/user.ennum';

export class UserEntity implements User {
  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  tokenValidityDate: Date;

  @ApiProperty()
  role: RoleType;

  @ApiProperty()
  status: UserStatusType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
