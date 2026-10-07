import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"


export class UserCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 64)
    password: string
}