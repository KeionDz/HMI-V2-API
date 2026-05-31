import { Module } from '@nestjs/common';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';

@Module({
  controllers: [LayerController],
  providers: [LayerService]
})
export class LayerModule {}
