import { Module } from '@nestjs/common';
import { CampaignController } from '../../presentation/controllers/campaign.controller';
import { CampaignService } from '../../application/services/campaign.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CampaignController],
  providers: [CampaignService, PrismaService],
  exports: [CampaignService],
})
export class CompanyModule {}
