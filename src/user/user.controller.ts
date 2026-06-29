import { Body, Controller, Post, UseGuards, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtCookieGuard } from 'src/auth/guard/jwt-cookie.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from './dto/create-user-dto';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(JwtCookieGuard, RoleGuard)
  @Roles('ADMIN')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  @UseGuards(JwtCookieGuard, RoleGuard)
  @Roles('ADMIN')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtCookieGuard, RoleGuard)
  @Roles('ADMIN')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
