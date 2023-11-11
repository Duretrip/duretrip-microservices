// roles.controller.ts

import { Controller, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post(':id/assign-permissions')
  async assignPermissionsToRole(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() body: { permissionIds: number[] },
  ) {
    const { permissionIds } = body;
    return this.rolesService.assignPermissionsToRole(roleId, permissionIds);
  }
}
