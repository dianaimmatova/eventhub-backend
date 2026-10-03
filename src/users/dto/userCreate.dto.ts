import { IsNotEmpty, IsString, Length } from "class-validator"


export class UserCreateDTO {
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(10, 28)
    password: string
}