import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from 'src/presentation/filters/exception.filters';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { AppController } from './app.controller';
import { CampaignController } from 'src/presentation/controllers/campaign.controller';
import { CampaignService } from 'src/application/services/campaign.service';

@Module({
  imports: [PrismaModule],
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
