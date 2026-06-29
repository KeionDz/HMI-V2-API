import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: signUpDto.username },
    });

    if (existingUser) {
      throw new ConflictException('Username is already registered');
    }

    const hashedPassword = await hash(signUpDto.password, 10);

    return this.prisma.user.create({
      data: {
        name: signUpDto.name,
        username: signUpDto.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatches = await compare(loginDto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    return {
      accessToken,
      user: safeUser,
    };
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });

    return {
      message: 'Logout successful',
    };
  }
}
