import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Permission } from '../../permissions/entities/permission.entity'; // Update the import path

@Entity()
export class Role extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column()
  name?: string;

  @ManyToMany(() => Permission, (permission) => permission.roles) // ManyToMany relationship with Permission
  @JoinTable()
  permissions: Permission[];
}
