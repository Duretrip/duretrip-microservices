// permission-seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'src/permissions/entities/permission.entity'; // Update the import path

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>,
  ) {}

  async run() {
    const countPermissions = await this.repository.count();

    if (!countPermissions) {
      const permissions = [
        { name: 'VIEW_JETS' },
        { name: 'BOOK_JETS' },
        { name: 'VIEW_HOTELS' },
        { name: 'BOOK_HOTELS' },
        // Add more permissions as needed
      ];

      await this.repository.save(this.repository.create(permissions));
    }
  }
}
