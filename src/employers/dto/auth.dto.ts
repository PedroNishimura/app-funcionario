import { IsString } from "class-validator";
import { IsNotEmpty, MinLength } from "class-validator/types/decorator/decorators";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
}