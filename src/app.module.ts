import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [UsersModule, PublicationModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}