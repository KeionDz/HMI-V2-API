import { IsEmail, IsString } from 'class-validator';
import { Roles } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  role!: Roles;
}
