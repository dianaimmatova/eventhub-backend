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

  private async generateTokens(id: string, email: string) {
    const payload = { sub: id, email }
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

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findByEmailWithPassword(loginDTO.email)
    if(!user) {
      throw new UnauthorizedException('Неверная почта или пароль')
    }

    const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password)
    if(!isPasswordValid) {
      throw new UnauthorizedException('Неверная почта или пароль')
    }

    return this.generateTokens(user.id, user.email) 
  }

  async refresh(refreshToken: string) {
  try {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
    });

    return this.generateTokens( payload.id , payload.email );
  } catch {
    throw new UnauthorizedException('Недействительный токен');
  }
}
}
