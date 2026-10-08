import { ConflictException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDTO } from "./dto/userCreate.dto.js";
import * as bcrypt from "bcrypt";



@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findAll() {
        return this.userRepository.find()
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async create(userCreateDTO: UserCreateDTO) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: userCreateDTO.email
            }
        })
        if (existUser) {
            throw new ConflictException("Пользователь с такой почтой уже существует")
        }
       
        const hash = await this.hashPassword(userCreateDTO.password);
        const user = await this.userRepository.save({ ...userCreateDTO, password: hash });
        return { id: user.id, name: user.name, email: user.email };
    }
}

    