import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    if (
      !createUserDto.username ||
      !createUserDto.password ||
      !createUserDto.role
    ) {
      throw new BadRequestException('Missing required fields');
    }

    const { username, password, role } = createUserDto;

    const newUser = await this.prismaService.user.create({
      data: {
        username,
        password,
        role,
      },
    });

    const { password: _, ...cleanUser } = newUser;

    return {
      message: 'User created successfully',
      data: cleanUser,
    };
  }
}
