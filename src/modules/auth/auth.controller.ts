import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  LoginVerifyDto,
  PasswordChangeDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userCreds: LoginUserDto) {
    return await this.authService.login(userCreds);
  }

  @Post('login-verify')
  async loginVeryfy(@Body() loginVeryfy: LoginVerifyDto) {
    return await this.authService.loginVerify(loginVeryfy);
  }

  @Post('password-change')
  async passwordChange(@Body() { email }: PasswordChangeDto) {
    return await this.authService.forgotPasswork(email);
  }
}
