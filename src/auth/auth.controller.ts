import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDTO } from './dto/login.dto.js';
import { RefreshDTO } from './dto/refresh.dto.js';


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
  
}
