import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { LayerService } from './layer.service';

jest.mock(
  'src/prisma/prisma.service',
  () => ({
    PrismaService: class PrismaService {},
  }),
  { virtual: true },
);

describe('LayerService', () => {
  let service: LayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LayerService,
        {
          provide: PrismaService,
          useValue: {
            layer: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<LayerService>(LayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
