import { Test, TestingModule } from '@nestjs/testing';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { JwtCookieGuard } from '../auth/guard/jwt-cookie.guard';
import { RoleGuard } from '../auth/guard/role.guard';

describe('CameraController', () => {
  let controller: CameraController;
  let cameraService: { addCamera: jest.Mock; getAllCamera: jest.Mock };

  beforeEach(async () => {
    cameraService = {
      addCamera: jest.fn(),
      getAllCamera: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CameraController],
      providers: [
        {
          provide: CameraService,
          useValue: cameraService,
        },
      ],
    })
      .overrideGuard(JwtCookieGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CameraController>(CameraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a camera through the service', async () => {
    const addCameraDto = {
      name: 'Dock camera',
      url: 'rtsp://localhost/camera',
      palletId: 'pallet-1',
    };

    cameraService.addCamera.mockResolvedValue(addCameraDto);

    await expect(controller.addCamera(addCameraDto)).resolves.toEqual(
      addCameraDto,
    );
    expect(cameraService.addCamera).toHaveBeenCalledWith(addCameraDto);
  });

  it('should get cameras through the service', async () => {
    const cameras = [
      {
        id: 'camera-1',
        name: 'Dock camera',
        url: 'rtsp://localhost/camera',
        palletId: 'pallet-1',
      },
    ];

    cameraService.getAllCamera.mockResolvedValue(cameras);

    await expect(controller.getCamera('camera-1')).resolves.toEqual(cameras);
    expect(cameraService.getAllCamera).toHaveBeenCalledWith('camera-1');
  });
});
