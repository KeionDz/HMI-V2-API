import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddCameraDto } from './dto/add-camera-dto';
import { CameraService } from './camera.service';
import { JwtCookieGuard } from '../auth/guard/jwt-cookie.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/roles.decorator';

@Controller({ path: 'camera', version: '1' })
export class CameraController {
  constructor(private cameraService: CameraService) {}

  @Post('add')
  @UseGuards(JwtCookieGuard, RoleGuard)
  @Roles('ADMIN')
  async addCamera(@Body() addCameraDto: AddCameraDto) {
    return this.cameraService.addCamera(addCameraDto);
  }

  @Get(':id')
  async getCamera(@Param('id') id: string) {
    return this.cameraService.getAllCamera(id);
  }
}
