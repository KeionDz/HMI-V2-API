import { Injectable } from '@nestjs/common';
import { AddCameraDto } from './dto/add-camera-dto';

@Injectable()
export class CameraService {
  async addCamera(addCameraDto: AddCameraDto) {}

  async getCamera() {}
}
