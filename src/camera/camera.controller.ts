import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddCameraDto } from './dto/add-camera-dto';
import { CameraService } from './camera.service';
import { JwtCookieGuard } from '../auth/guard/jwt-cookie.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('camera')
export class CameraController {
  constructor(private cameraService: CameraService) {}

  @Post('add')
  @UseGuards(JwtCookieGuard, RoleGuard)
  @Roles('ADMIN')
  async addCamera(@Body() addCameraDto: AddCameraDto) {
    return this.cameraService.addCamera(addCameraDto);
  }

  @Get()
  async getCamera() {
    return this.cameraService.getCamera();
  }
}
