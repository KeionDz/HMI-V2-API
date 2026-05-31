import { Test, TestingModule } from '@nestjs/testing';
import { JwtCookieGuard } from '../auth/guard/jwt-cookie.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { PalletController } from './pallet.controller';
import { PalletService } from './pallet.service';

describe('PalletController', () => {
  let controller: PalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PalletController],
      providers: [
        {
          provide: PalletService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(JwtCookieGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PalletController>(PalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
