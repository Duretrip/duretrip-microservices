import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ExistingUserDTO } from '@dure-trips/shared/dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@dure-trips/shared/entities';
import { ForgetPasswordDto } from 'apps/auth-microservice/src/dtos/forget-password.dto';
import { Roles } from '@dure-trips/shared/decorators';
import { Role } from '@dure-trips/shared/enum/user.ennum';
// import { AuthGuard, RoleGuard } from '@dure-trips/shared/guards';
// import { UserInterceptor } from '@dure-trips/shared/interceptors';
// import { LocalAuthGuard } from 'apps/auth-microservice/src/guards/local-auth.guard';

@Controller('auth')
@ApiTags('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  @ApiCreatedResponse({ type: UserEntity })
  async login(@Body(ValidationPipe) existingUserDTO: ExistingUserDTO) {
    return this.authService.login(existingUserDTO);
  }

  @Get('users')
  @Roles(Role.USER)
  // @UseGuards(AuthGuard, RoleGuard)
  // @UseInterceptors(UserInterceptor)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('users/:id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('iiddddd', id);
    return this.authService.getUser(id);
  }

  @Put('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  forgotPassword(
    @Body(ValidationPipe)
    forgetPasswordDto: ForgetPasswordDto,
  ) {
    return this.authService.forgotPassword(forgetPasswordDto);
  }
}
