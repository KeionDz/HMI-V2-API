import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    if (
      !createUserDto.name ||
      !createUserDto.email ||
      !createUserDto.password ||
      !createUserDto.role
    ) {
      throw new BadRequestException('Missing required fields');
    }

    const { name, email, password, role } = createUserDto;

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
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

  async getAllUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }
}
