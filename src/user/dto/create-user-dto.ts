import { IsString } from 'class-validator';
import { Roles } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  username!: string;
  @IsString()
  password!: string;

  @IsString()
  role!: Roles;
}
