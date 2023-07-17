import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PublicationRepository } from './repository/publication.repository';
import { PrismaPublicationRepository } from './repository/implementations/prismaPublications.repository';
import { UsersModule } from 'src/user/user.module';

@Module({
  controllers: [PublicationController],
  providers: [
    PublicationService,
    {
      provide: PublicationRepository,
      useClass: PrismaPublicationRepository,
    },
  ],
  imports: [AuthModule, UsersModule],
})
export class PublicationModule {}