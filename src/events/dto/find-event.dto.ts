import { IsOptional, IsString, IsUUID } from "class-validator"

export class FindEventDTO {
    @IsOptional()
    @IsString()
    search: string

    @IsUUID()
    @IsOptional()
    categoryId:string 
}