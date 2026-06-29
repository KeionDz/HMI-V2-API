import { IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  username!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
