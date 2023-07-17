import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDTO } from './dto/auth-signup.dto';
import { AuthGuard } from './auth-guard/auth.guard';
import { User as UserRequest } from './decorators/user.decorator';
import { User } from '@prisma/client';
import { AuthSigninDTO } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body: AuthSigninDTO) {
    return this.authService.signin(body);
  }

  @HttpCode(200)
  @Post('signup')
  async signup(@Body() body: AuthSignUpDTO) {
    return this.authService.signup(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async userLogged(@UserRequest() user: User) {
    return user;
  }
}