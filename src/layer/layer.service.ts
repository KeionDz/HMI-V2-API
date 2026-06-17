import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLayerDto } from './dto/create-layer';

@Injectable()
export class LayerService {
  constructor(private prisma: PrismaService) {}
  async createLayer(createLayerDto: CreateLayerDto) {
    return this.prisma.layer.create({
      data: {
        name: createLayerDto.name,
        NumberOfPalletsAccomodated: createLayerDto.numberOfPalletsAccomodated,
        active: createLayerDto.active,
      },
    });
  }
}
