import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PalletModule } from './pallet/pallet.module';
import { AuthModule } from './auth/auth.module';
import { LayerModule } from './layer/layer.module';

@Module({
  imports: [PrismaModule, PalletModule, AuthModule, LayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
