import { IsString } from 'class-validator';

export class AddCameraDto {
  @IsString()
  name!: string;

  @IsString()
  url!: string;

  @IsString()
  palletId!: string;
}
