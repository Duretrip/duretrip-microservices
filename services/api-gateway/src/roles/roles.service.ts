import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) { }

  async assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (role) {
      const permissions = await this.permissionRepository.find({ where: { id: In(permissionIds) } });
      role.permissions = permissions;
      await this.roleRepository.save(role);
      return role;
    } else {
      // Handle the case where the role with the specified ID is not found
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
  }
}
