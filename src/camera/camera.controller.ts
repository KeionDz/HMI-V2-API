import { Controller, Post, Get } from '@nestjs/common';
import { AddCameraDto } from './dto/add-camera-dto';
import { CameraService } from './camera.service';

@Controller('camera')
export class CameraController {
  constructor(private cameraService: CameraService) {}
  @Post('add')
  async addCamera(addCameraDto: AddCameraDto) {
    return this.cameraService.addCamera(addCameraDto);
  }

  @Get()
  async getCamera() {}
}
