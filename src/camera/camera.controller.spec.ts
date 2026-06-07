import { Test, TestingModule } from '@nestjs/testing';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';

describe('CameraController', () => {
  let controller: CameraController;
  let cameraService: { addCamera: jest.Mock };

  beforeEach(async () => {
    cameraService = {
      addCamera: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CameraController],
      providers: [
        {
          provide: CameraService,
          useValue: cameraService,
        },
      ],
    }).compile();

    controller = module.get<CameraController>(CameraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a camera through the service', async () => {
    const addCameraDto = {
      name: 'Dock camera',
      url: 'rtsp://localhost/camera',
    };

    cameraService.addCamera.mockResolvedValue(addCameraDto);

    await expect(controller.addCamera(addCameraDto)).resolves.toEqual(
      addCameraDto,
    );
    expect(cameraService.addCamera).toHaveBeenCalledWith(addCameraDto);
  });
});
