// roles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]), // Import the repositories for Role and Permission
  ],
  providers: [RolesService],
  exports: [RolesService], // Export the service if needed in other modules
})
export class RolesModule {}
