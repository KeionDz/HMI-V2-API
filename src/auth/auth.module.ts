import 'dotenv/config';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { JwtSignOptions } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtCookieGuard } from './guard/jwt-cookie.guard';
import { RoleGuard } from './guard/role.guard';

const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ??
  '1d') as JwtSignOptions['expiresIn'];

@Global()
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'change-this-jwt-secret',
      signOptions: {
        expiresIn: jwtExpiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtCookieGuard, RoleGuard],
  exports: [AuthService, JwtModule, JwtCookieGuard, RoleGuard],
})
export class AuthModule {}
