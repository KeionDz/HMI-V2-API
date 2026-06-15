import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CameraService } from './camera.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CameraService', () => {
  let service: CameraService;
  let prisma: {
    pallet: {
      findUnique: jest.Mock;
    };
    camera: {
      create: jest.Mock;
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      pallet: {
        findUnique: jest.fn(),
      },
      camera: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CameraService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<CameraService>(CameraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a camera assigned to a pallet', async () => {
    const addCameraDto = {
      name: 'Dock camera',
      url: 'rtsp://localhost/camera',
      palletId: 'pallet-1',
    };
    const createdCamera = {
      id: 'camera-1',
      ...addCameraDto,
      pallet: { id: 'pallet-1' },
    };

    prisma.pallet.findUnique.mockResolvedValue({ id: addCameraDto.palletId });
    prisma.camera.create.mockResolvedValue(createdCamera);

    await expect(service.addCamera(addCameraDto)).resolves.toEqual(
      createdCamera,
    );
    expect(prisma.pallet.findUnique).toHaveBeenCalledWith({
      where: { id: addCameraDto.palletId },
      select: { id: true },
    });
    expect(prisma.camera.create).toHaveBeenCalledWith({
      data: {
        name: addCameraDto.name,
        url: addCameraDto.url,
        pallet: {
          connect: { id: addCameraDto.palletId },
        },
      },
      include: {
        pallet: true,
      },
    });
  });

  it('should throw when the pallet does not exist', async () => {
    const addCameraDto = {
      name: 'Dock camera',
      url: 'rtsp://localhost/camera',
      palletId: 'missing-pallet',
    };

    prisma.pallet.findUnique.mockResolvedValue(null);

    await expect(service.addCamera(addCameraDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(prisma.camera.create).not.toHaveBeenCalled();
  });
});
