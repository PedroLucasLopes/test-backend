import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CampaignBodyDTO } from '../DTO/campaign-body-dto';
import {
  NotFoundError,
  UnauthorizedError,
} from 'src/presentation/responses/error.types';
import { missingFields } from 'src/presentation/filters/missingFields.filter';
@Injectable()
export class CampaignService {
  constructor(private prismaService: PrismaService) {}

  async create({
    name,
    startDate,
    endDate,
    status,
    category,
  }: CampaignBodyDTO) {
    const fields = missingFields({
      name,
      startDate,
      endDate,
      status,
      category,
    });
    if (fields) {
      console.log(fields);
      throw new UnauthorizedError(`Please enter the missing fields: ${fields}`);
    }

    const campaign = await this.prismaService.campaign.create({
      data: { name, startDate, endDate, status, category },
    });
    return { campaign };
  }

  async findAll() {
    const campaigns = await this.prismaService.campaign.findMany();
    return { campaigns };
  }

  async findOne(id: string) {
    const campaign = await this.prismaService.campaign.findUnique({
      where: { id },
    });
    if (!campaign) throw new NotFoundError('Campaign not Found');

    return { campaign };
  }

  async update(id: string, body: Partial<CampaignBodyDTO>) {
    await this.findOne(id);

    const campaign = await this.prismaService.campaign.update({
      data: body,
      where: { id },
    });

    return { campaign };
  }

  async remove(id: string) {
    await this.findOne(id);

    const campaign = await this.prismaService.campaign.delete({
      where: { id },
    });
    return { campaign };
  }
}
