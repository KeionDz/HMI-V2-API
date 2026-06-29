import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: {
    signUp: jest.Mock;
    login: jest.Mock;
    logout: jest.Mock;
  };

  const mockResponse = () =>
    ({
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    }) as unknown as Response;

  beforeEach(async () => {
    authService = {
      signUp: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a user through the service', async () => {
    const signUpDto = {
      name: 'Hanzo',
      username: 'hanzo',
      password: 'secret',
    };
    const serviceResponse = {
      id: 'user-id',
      name: signUpDto.name,
      username: signUpDto.username,
    };

    authService.signUp.mockResolvedValue(serviceResponse);

    await expect(controller.signUp(signUpDto)).resolves.toEqual(
      serviceResponse,
    );
    expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
  });

  it('should set an access token cookie and return the login body', async () => {
    const loginDto = {
      username: 'hanzo',
      password: 'secret',
    };
    const user = {
      id: 'user-id',
      name: 'Hanzo',
      username: loginDto.username,
      role: 'USER',
    };
    const response = mockResponse();

    authService.login.mockResolvedValue({
      accessToken: 'jwt-token',
      user,
    });

    await expect(controller.login(loginDto, response)).resolves.toEqual({
      message: 'Login successful',
      user,
    });
    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(response.cookie).toHaveBeenCalledWith('access_token', 'jwt-token', {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
    });
  });

  it('should clear the access token cookie and logout through the service', async () => {
    const response = mockResponse();

    authService.logout.mockResolvedValue({
      message: 'Logout successful',
    });

    await expect(
      controller.logout(response, { id: 'user-id' }),
    ).resolves.toEqual({
      message: 'Logout successful',
    });
    expect(response.clearCookie).toHaveBeenCalledWith('access_token');
    expect(authService.logout).toHaveBeenCalledWith('user-id');
  });
});
