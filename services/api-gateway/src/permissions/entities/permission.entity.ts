// permission.entity.ts
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { EntityHelper } from 'src/utils/entity-helper';
  
  @Entity()
  export class Permission extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;
  
    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable()
    roles: Role[];
  }
  