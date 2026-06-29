import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtCookieGuard } from 'src/auth/guard/jwt-cookie.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
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

jest.mock(
  'src/auth/guard/jwt-cookie.guard',
  () => ({
    JwtCookieGuard: class JwtCookieGuard {},
  }),
  { virtual: true },
);

jest.mock(
  'src/auth/guard/role.guard',
  () => ({
    RoleGuard: class RoleGuard {},
  }),
  { virtual: true },
);

describe('UserController', () => {
  let controller: UserController;
  let userService: { createUser: jest.Mock };

  beforeEach(async () => {
    userService = {
      createUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    })
      .overrideGuard(JwtCookieGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user through the service', async () => {
    const createUserDto = {
      name: 'Hanzo',
      username: 'hanzo',
      password: 'secret',
      role: Roles.USER,
    };
    const serviceResponse = {
      message: 'User created successfully',
      data: {
        id: 'user-id',
        name: createUserDto.name,
        username: createUserDto.username,
        role: createUserDto.role,
      },
    };

    userService.createUser.mockResolvedValue(serviceResponse);

    await expect(controller.createUser(createUserDto)).resolves.toEqual(
      serviceResponse,
    );
    expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
  });
});
