import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthSignUpDTO } from './dto/auth-signup.dto';
import { AuthSigninDTO } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(body: AuthSignUpDTO) {
    const user = await this.usersService.create(body);
    return this.createToken(user);
  }

  async signin({ email, password }: AuthSigninDTO) {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Email or password invalid');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Email or password invalid');

    return this.createToken(user);
  }

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: 'social postify',
        audience: 'users',
      },
    );

    return { token };
  }
}