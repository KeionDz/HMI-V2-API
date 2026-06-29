import { Injectable, BadRequestException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    if (
      !createUserDto.name ||
      !createUserDto.username ||
      !createUserDto.password ||
      !createUserDto.role
    ) {
      throw new BadRequestException('Missing required fields');
    }

    const { name, username, password, role } = createUserDto;
    const hashedPassword = await hash(password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
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
        username: true,
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
        username: true,
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
