import { IsEmail, IsNotEmpty} from "class-validator"

export class UserEnterDTO {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}