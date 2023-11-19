// src/airports/entities/airport.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class Airport {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'JFK' })
  @IsString()
  @IsNotEmpty()
  @Column({ unique: true, length: 3 })
  code: string;

  @ApiProperty({ example: 'John F. Kennedy International Airport' })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({ example: 'NYC' })
  @IsString()
  @Column()
  cityCode: string;

  @ApiProperty({ example: 'New York City' })
  @IsString()
  @Column()
  cityName: string;

  @ApiProperty({ example: 'United States' })
  @IsString()
  @Column()
  countryName: string;

  @ApiProperty({ example: 'US' })
  @IsString()
  @Column()
  countryCode: string;

  @ApiProperty({ example: 'America/New_York' })
  @IsString()
  @Column()
  timezone: string;

  @ApiProperty({ example: 40.6413 })
  @IsNumber()
  @Column('decimal', { precision: 8, scale: 4 })
  lat: number;

  @ApiProperty({ example: -73.7781 })
  @IsNumber()
  @Column('decimal', { precision: 8, scale: 4 })
  lon: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Column()
  numAirports: number;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @Column()
  city: string;

  // Constructor for easier entity creation
  constructor(partial: Partial<Airport>) {
    Object.assign(this, partial);
  }
}
