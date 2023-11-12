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
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  availableHours: string;

  @IsNotEmpty()
  registrationNumber: string;

  @IsNotEmpty()
  @IsString()
  currentLocation: string;

  @IsArray()
  @IsNotEmpty()
  capacities: number[];

  @IsArray()
  @IsNotEmpty()
  ranges: number[];

  @IsArray()
  @IsNotEmpty()
  facilities: number[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  priceDescription: string;

  @IsArray()
  @IsOptional()
  pictures: string[];

  // @IsEnum(AvailabilityEnum)
  // @IsNotEmpty()
  // availabilityStatus: 'available' | 'unavailable' | 'hired';
}
