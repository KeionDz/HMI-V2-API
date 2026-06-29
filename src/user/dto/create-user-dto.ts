import { IsEnum, IsString, MinLength } from 'class-validator';
import { Roles } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsString()
  username!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsEnum(Roles)
  role!: Roles;
}
