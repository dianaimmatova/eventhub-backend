import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto.js';
import { UserService } from '../users/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt";
import { type JwtSignOptions } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService 
  ){}

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findByEmailWithPassword(loginDTO.email)
    if(!user) {
      throw new UnauthorizedException('Неверная почта или пароль')
    }

    const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password)
    if(!isPasswordValid) {
      throw new UnauthorizedException('Неверная почта или пароль')
    }

    const payload = { sub: user.id, email: user.email }
    const accessToken = await this.jwtService.signAsync(payload, 
      {secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
      expiresIn: this.configService.getOrThrow<string>("JWT_ACCESS_EXPIRES") as JwtSignOptions['expiresIn']
      });
    
    const refreshToken = await this.jwtService.signAsync(payload, 
    {secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
    expiresIn:this.configService.getOrThrow<string>("JWT_REFRESH_EXPIRES") as JwtSignOptions['expiresIn']
    });

    return {accessToken, refreshToken}
  }
}
