import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCameraDto } from './dto/add-camera-dto';

@Injectable()
export class CameraService {
  constructor(private readonly prisma: PrismaService) {}

  async addCamera(addCameraDto: AddCameraDto) {
    const { name, url, palletId } = addCameraDto;

    const pallet = await this.prisma.pallet.findUnique({
      where: { id: palletId },
      select: { id: true },
    });

    if (!pallet) {
      throw new NotFoundException('Pallet not found');
    }

    return this.prisma.camera.create({
      data: {
        name,
        url,
        pallet: {
          connect: { id: palletId },
        },
      },
      include: {
        pallet: true,
      },
    });
  }

  async getAllCamera(id: string) {
    return this.prisma.camera.findMany({
      where: {
        id,
      },
      include: {
        pallet: true,
      },
    });
  }
}
