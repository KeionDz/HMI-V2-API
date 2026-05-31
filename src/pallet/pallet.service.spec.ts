import { Test, TestingModule } from '@nestjs/testing';
import { PalletService } from './pallet.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PalletService', () => {
  let service: PalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PalletService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PalletService>(PalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
