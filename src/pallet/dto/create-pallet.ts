import { IsString } from 'class-validator';

export class CreatePalletDto {
  @IsString()
  label!: string;

  @IsString()
  description!: string;

  @IsString()
  taskId!: string;

  @IsString()
  palletCode!: string;

  @IsString()
  beginCell!: string;

  @IsString()
  endStation!: string;

  @IsString()
  layerId!: string;
}
