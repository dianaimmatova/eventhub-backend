import { IsDateString, IsInt, IsNotEmpty, IsString, IsUUID, MaxLength, Min } from "class-validator"

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string

    @IsDateString()
    date: string

    @IsString()
    @IsNotEmpty()
    address: string

    @Min(0)
    @IsInt()
    price: number

    @Min(1)
    @IsInt()
    capacity: number

    @IsString()
    @IsNotEmpty()
    image: string

    @IsUUID()
    categoryId: string
}
