import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { Roles } from '../generated/prisma/enums';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: {
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };
  let jwtService: {
    signAsync: jest.Mock;
  };

  beforeEach(async () => {
    prismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };
    jwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should include the user role in the login response and JWT payload', async () => {
    const password = 'secret123';
    const user = {
      id: 'user-id',
      name: 'Admin',
      username: 'admin',
      password: await hash(password, 10),
      lastLogin: null,
      role: Roles.ADMIN,
    };

    prismaService.user.findUnique.mockResolvedValue(user);
    jwtService.signAsync.mockResolvedValue('jwt-token');

    await expect(
      service.login({
        username: user.username,
        password,
      }),
    ).resolves.toEqual({
      accessToken: 'jwt-token',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });
  });
});
