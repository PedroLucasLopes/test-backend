import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from '../../presentation/filters/exception.filters';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { AppController } from './app.controller';
import { CampaignController } from '../../presentation/controllers/campaign.controller';
import { CampaignService } from '../../application/services/campaign.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [AppController, CampaignController],
  providers: [
    PrismaService,
    CampaignService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
