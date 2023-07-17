import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignUpDTO } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { AuthSigninDTO } from './dto/auth-login.dto';
import { UsersRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
  private AUDIENCE: string = 'users';
  private ISSUER: string = 'social postify';

  constructor(
    private readonly usersService: UserService,
    private readonly usersRepository: UsersRepository,
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
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      },
    );

    return { token };
  }

  checkeToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}