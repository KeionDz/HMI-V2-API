import { IsString } from 'class-validator';

export class CreateLayerDto {
  @IsString()
  name!: string;

  @IsString()
  numberOfPalletsAccomodated!: string;

  @IsString()
  active!: boolean;
}
