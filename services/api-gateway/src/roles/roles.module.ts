// roles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './roles.service';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]), // Import the repositories for Role and Permission
  ],
  providers: [RoleService],
  controllers: [RolesController],
  exports: [RoleService], // Export the service if needed in other modules
})
export class RolesModule {}
