import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePalletDto } from './dto/create-pallet';

@Injectable()
export class PalletService {
  constructor(private readonly prisma: PrismaService) {}

  async createPallet(createPalletDto: CreatePalletDto) {
    const isPalletExisting = await this.prisma.pallet.findFirst({
      where: {
        palletCode: createPalletDto.palletCode,
      },
    });

    if (isPalletExisting) {
      throw new ConflictException('Pallet already exists');
    }

    return this.prisma.pallet.create({
      data: createPalletDto,
    });
  }


}
