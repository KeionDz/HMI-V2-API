import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtCookieGuard } from 'src/auth/guard/jwt-cookie.guard';
import { CreateUserDto } from './dto/create-user-dto';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(JwtCookieGuard, RoleGuard)
  async createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
