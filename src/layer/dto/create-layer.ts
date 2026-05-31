import { IsString } from "class-validator";

export class CreateLayerDto {
    @IsString()
    name!: string;
    
    @IsString()
    NumberOfPalletsAccomodated!: string;

    @IsString()
    active!: boolean;
}