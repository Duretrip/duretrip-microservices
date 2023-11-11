import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { DeepPartial, In, Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) { }

  async run() {
    // Check if the permissions exist
    const viewJetsPermission = await this.permissionRepository.findOne({ where: { name: 'VIEW_JETS' } });
    const bookJetsPermission = await this.permissionRepository.findOne({ where: { name: 'BOOK_JETS' } });

    // Create permissions if they don't exist
    if (!viewJetsPermission) {
      await this.permissionRepository.save(
        this.permissionRepository.create({
          name: 'VIEW_JETS',
        }),
      );
    }

    if (!bookJetsPermission) {
      await this.permissionRepository.save(
        this.permissionRepository.create({
          name: 'BOOK_JETS',
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        id: RoleEnum.user,
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.user,
          name: 'User',
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (!countAdmin) {
      // Create Admin role without permissions
      const adminRole = this.repository.create({
        id: RoleEnum.admin,
        name: 'Admin',
      });

      // Save Admin role without permissions
      const savedAdminRole = await this.repository.save(adminRole);

      // Assign permissions to the Admin role
      const permissions = await this.permissionRepository.find({
        where: { name: In(['VIEW_JETS', 'BOOK_JETS']) },
      });
      
      savedAdminRole.permissions = permissions;
      
      // Save the Admin role with assigned permissions
      const finalResult = await this.repository.save(savedAdminRole);
    }
  }
}
