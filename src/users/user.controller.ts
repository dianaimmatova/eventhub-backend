import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { UserCreateDTO } from "./dto/userCreate.dto.js";
import { Public } from "@nestjs/authentication";



@Controller('users')
export class UserController{
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getAllUsers() {
        return this.userService.findAll()
    }

    @Post()
    createUser(@Body() userCreateDTO: UserCreateDTO ) {
        return this.userService.create(userCreateDTO)
    }

}