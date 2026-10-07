import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { UserCreateDTO } from "./dto/userCreate.dto.js";
import { Public } from "@nestjs/authentication";
import { UserEnterDTO } from "./dto/userEnter.dto.js";


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
    @Public()
    createUser(@Body() userCreateDTO: UserCreateDTO ) {
        return this.userService.create(userCreateDTO)
    }

    @Post('login')
    @Public()
    enterUser(@Body() userEnterDTO: UserEnterDTO) {
        return this.userService.login(userEnterDTO)
    }
}