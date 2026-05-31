import { Test, TestingModule } from '@nestjs/testing';
import { JwtCookieGuard } from '../auth/guard/jwt-cookie.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';

jest.mock(
  'src/prisma/prisma.service',
  () => ({
    PrismaService: class PrismaService {},
  }),
  { virtual: true },
);

describe('LayerController', () => {
  let controller: LayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LayerController],
      providers: [
        {
          provide: LayerService,
          useValue: {
            createLayer: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtCookieGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<LayerController>(LayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
