import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePalletDto } from './dto/create-pallet';
import { PalletService } from './pallet.service';
import { JwtCookieGuard } from '../auth/guard/jwt-cookie.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/roles.decorator';

@Controller({ path: 'pallet', version: '1' })
export class PalletController {
  constructor(private palletService: PalletService) {}

  @Post('create')
  @UseGuards(JwtCookieGuard, RoleGuard)
  @Roles('ADMIN')
  async createPallet(@Body() createPalletDto: CreatePalletDto) {
    return this.palletService.createPallet(createPalletDto);
  }
}
