import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { PrismaUsersRepository } from './repository/implementation/prismaUser.repository';
import { UsersRepository } from './repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}