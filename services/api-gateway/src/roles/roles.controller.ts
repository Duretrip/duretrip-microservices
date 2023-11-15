// roles.controller.ts

import { Controller, Param, ParseIntPipe, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post(':id/assign-permissions')
  async assignPermissionsToRole(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() body: { permissionIds: number[] },
  ) {
    const { permissionIds } = body;
    return await this.rolesService.assignPermissionsToRole(roleId, permissionIds);
  }

  @Get(':id/permissions')
  async getRolePermissions(@Param('id') roleId: number) {
    return await this.rolesService.getRolePermissions(roleId);
  }
}
