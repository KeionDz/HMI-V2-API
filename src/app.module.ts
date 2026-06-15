import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PalletModule } from './pallet/pallet.module';
import { AuthModule } from './auth/auth.module';
import { LayerModule } from './layer/layer.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CameraModule } from './camera/camera.module';

@Module({
  imports: [PrismaModule, PalletModule, AuthModule, LayerModule, UserModule, CameraModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
