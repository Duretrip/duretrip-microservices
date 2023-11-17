// role.entity.ts

import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber, IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Permission } from 'src/permissions/entities/permission.entity'; // Update the import path

@Entity()
export class Role extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Admin' })
  @Allow()
  @IsString()
  @IsNotEmpty()
  @Column()
  name?: string;

  @ApiProperty({ type: () => [Permission] })
  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  @IsArray()
  @ArrayNotEmpty()
  permissions: Permission[];
}
