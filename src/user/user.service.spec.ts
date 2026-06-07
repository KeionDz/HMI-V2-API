import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from 'src/generated/prisma/enums';

jest.mock(
  'src/generated/prisma/enums',
  () => ({
    Roles: {
      ADMIN: 'ADMIN',
      USER: 'USER',
    },
  }),
  { virtual: true },
);

jest.mock(
  'src/prisma/prisma.service',
  () => ({
    PrismaService: class PrismaService {},
  }),
  { virtual: true },
);

describe('UserService', () => {
  let service: UserService;
  let prismaService: { user: { create: jest.Mock } };

  beforeEach(async () => {
    prismaService = {
      user: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user and omit the password from the response', async () => {
    const createUserDto = {
      name: 'Hanzo',
      email: 'hanzo@example.com',
      password: 'secret',
      role: Roles.USER,
    };

    prismaService.user.create.mockResolvedValue({
      id: 'user-id',
      ...createUserDto,
    });

    await expect(service.createUser(createUserDto)).resolves.toEqual({
      message: 'User created successfully',
      data: {
        id: 'user-id',
        name: 'Hanzo',
        email: 'hanzo@example.com',
        role: Roles.USER,
      },
    });
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: createUserDto,
    });
  });

  it('should throw when required fields are missing', async () => {
    await expect(
      service.createUser({
        name: '',
        email: 'hanzo@example.com',
        password: 'secret',
        role: Roles.USER,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
