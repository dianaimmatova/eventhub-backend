import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDTO } from "./dto/userCreate.dto.js";
import { PasswordHasher } from "@nestjs/authentication";
import { UserEnterDTO} from "./dto/userEnter.dto.js";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly passwordHasher: PasswordHasher
    ) {}

    async hashPassword(password: string) {
        return await this.passwordHasher.hash(password);
    }

    findAll() {
        return this.userRepository.find()
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
        const user = await this.userRepository.save({...userCreateDTO, password: hash})
        return {id: user.id, name: user.name, email: user.email}
    }

    async login(userEnterDTO: UserEnterDTO) {
        const findByEmail = await this.userRepository.findOne({
            where: {
                email: userEnterDTO.email
            },
            select: {
                id: true,
                password: true,
                name: true,
                email: true
            }
        }) 
        
        const isValid = await this.passwordHasher.verify(userEnterDTO.password, findByEmail?.password)

        if (!isValid || !findByEmail) {
            throw new UnauthorizedException("Неверная почта или пароль")
        }
        return {id: findByEmail.id, email: findByEmail.email}
    }
    
}