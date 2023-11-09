import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AvailabilityEnum {
  AVAILABLE = 'available',
  UAVAILABLE = 'unavailable',
  HIRED = 'hired',
}

export class CreateJetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  availableHours: string;

  @IsNotEmpty()
  registrationNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  currentLocation: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  capacities: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  ranges: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  facilities: number[];

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  priceDescription: string;

  @IsArray()
  @ApiProperty()
  @IsOptional()
  pictures: string[];

  // @IsEnum(AvailabilityEnum)
  // @IsNotEmpty()
  // availabilityStatus: 'available' | 'unavailable' | 'hired';
}
