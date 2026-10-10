import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDTO } from './dto/login.dto.js';
import { RefreshDTO } from './dto/refresh.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post( 'login')
  loginUser(@Body() loginDTO: LoginDTO ) {
    return this.authService.login(loginDTO)
  }

  @Post('refresh')
  freshToken(@Body() refreshDTO : RefreshDTO) {
    return this.authService.refresh(refreshDTO.refreshToken)
  }  
  
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() request: {user: {id: string, email: string}}) {
    return request.user
  }
}
