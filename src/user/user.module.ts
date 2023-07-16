import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { PrismaUsersRepository } from './repository/implementation/prismaUser.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}