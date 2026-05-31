import { Module } from '@nestjs/common';
import { PalletController } from './pallet.controller';
import { PalletService } from './pallet.service';

@Module({
  controllers: [PalletController],
  providers: [PalletService]
})
export class PalletModule {}
