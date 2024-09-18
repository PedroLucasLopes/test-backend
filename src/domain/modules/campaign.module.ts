import { Module } from '@nestjs/common';
import { CampaignController } from 'src/presentation/controllers/campaign.controller';
import { CampaignService } from 'src/application/services/campaign.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CampaignController],
  providers: [CampaignService, PrismaService],
  exports: [CampaignService],
})
export class CompanyModule {}
