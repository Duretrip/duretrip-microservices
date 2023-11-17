// roles.controller.ts

import { Controller, Param, Post, Body, Get, Put, Patch, Delete, NotFoundException } from '@nestjs/common';
import { RoleService } from './roles.service';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiParam, ApiBadRequestResponse, ApiBody } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) { }
  @Get()
  @ApiOperation({ summary: 'Get all roles', description: 'Retrieve a list of all roles with their associated permissions.' })
  @ApiResponse({ status: 200, description: 'Roles fetched successfully', type: Role, isArray: true })
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID', description: 'Retrieve a role by its ID with associated permissions.' })
  @ApiResponse({ status: 200, description: 'Role fetched successfully', type: Role })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiParam({ name: 'id', description: 'Role ID', type: Number })
  async findById(@Param('id') id: number): Promise<Role> {
    const role = await this.roleService.findById(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role', description: 'Create a new role with optional permissions.' })
  @ApiResponse({ status: 201, description: 'Role created successfully', type: Role })
  @ApiBadRequestResponse({ description: 'Invalid role data' })
  @ApiBody({ type: Role })
  async create(@Body() roleData: Role): Promise<Role> {
    return this.roleService.create(roleData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a role by ID', description: 'Update an existing role by its ID.' })
  @ApiResponse({ status: 200, description: 'Role updated successfully', type: Role })
  @ApiBadRequestResponse({ description: 'Invalid role data' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiParam({ name: 'id', description: 'Role ID', type: Number })
  @ApiBody({ type: Role })
  async update(@Param('id') id: number, @Body() roleData: Role): Promise<Role> {
    return await this.roleService.update(id, roleData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by ID', description: 'Delete an existing role by its ID.' })
  @ApiResponse({ status: 204, description: 'Role deleted successfully' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiParam({ name: 'id', description: 'Role ID', type: Number })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.roleService.delete(id);
  }

  @Patch(':roleId/add-permission/:permissionId')
  @ApiOperation({ summary: 'Add permission to role', description: 'Add a permission to a role.' })
  @ApiResponse({ status: 200, description: 'Permission added successfully', type: Role })
  @ApiBadRequestResponse({ description: 'Role or permission not found' })
  @ApiParam({ name: 'roleId', description: 'Role ID', type: Number })
  @ApiParam({ name: 'permissionId', description: 'Permission ID', type: Number })
  async addPermissionToRole(@Param('roleId') roleId: number, @Param('permissionId') permissionId: number): Promise<Role> {
    return await this.roleService.addPermissionToRole(roleId, permissionId);
  }

  @Patch(':roleId/remove-permission/ :permissionId')
  @ApiOperation({ summary: 'Remove permission from role', description: 'Remove a permission from a role.' })
  @ApiResponse({ status: 200, description: 'Permission removed successfully', type: Role })
  @ApiBadRequestResponse({ description: 'Role not found' })
  @ApiParam({ name: 'roleId', description: 'Role ID', type: Number })
  @ApiParam({ name: 'permissionId', description: 'Permission ID', type: Number })
  async removePermissionFromRole(@Param('roleId') roleId: number, @Param('permissionId') permissionId: number): Promise<Role> {
    return await this.roleService.removePermissionFromRole(roleId, permissionId);
  }
}
