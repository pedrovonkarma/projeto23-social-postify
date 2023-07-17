import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaUsersRepository } from 'src/user/repository/implementation/prismaUser.repository';
import { AuthGuard } from './auth-guard/auth.guard';
import { UsersRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    AuthGuard,
  ],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}