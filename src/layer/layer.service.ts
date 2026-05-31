import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LayerService {
    constructor(private prisma: PrismaService) {}
    async createLayer() {
        return this.prisma.layer.create({
            data: {
                name: 'Layer 1',
                NumberOfPalletsAccomodated: '10',
                active: true,
            }
        })
    }
}
