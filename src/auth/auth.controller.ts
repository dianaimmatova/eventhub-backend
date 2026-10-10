import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDTO } from './dto/login.dto.js';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post( 'login')
  loginUser(@Body() loginDTO: LoginDTO ) {
          return this.authService.login(loginDTO)
      }
  
}
