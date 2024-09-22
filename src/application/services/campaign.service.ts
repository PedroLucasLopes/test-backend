import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CampaignBodyDTO } from '../DTO/campaign-body-dto';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from 'src/presentation/responses/error.types';
import missingFields from 'src/presentation/filters/missingFields.filter';
import validateDateFormat from 'src/presentation/filters/validateDateFormat.filter';
import convertToDate from 'src/presentation/filters/converttodate.filter';
import checkDateValidation from 'src/presentation/filters/checkdatevalidation.filter';
import checkCampaignEnd from 'src/presentation/filters/checkcampaignend.filter';
import campaignStatus from 'src/presentation/filters/campaignstatus.filter';
import { StatusType } from '@prisma/client';
import statusTypeIsValid from 'src/presentation/filters/statusTypeIsValid.filter';

@Injectable()
export class CampaignService {
  constructor(private prismaService: PrismaService) {}

  async create({
    name,
    startDate,
    endDate,
    category,
  }: CampaignBodyDTO) {
    const fields = missingFields({
      name,
      startDate,
      endDate,
      category,
    });
    const validateFormat = validateDateFormat([
      String(startDate),
      String(endDate),
    ]);
    const start = convertToDate(String(startDate));
    const end = convertToDate(String(endDate));
    const checkDate = checkDateValidation(start);
    const campaignEnd = checkCampaignEnd(start, end);
    const status = campaignStatus(end)

    const validations = {
      fields: {
        condition: fields,
        message: `Please enter the missing fields: ${fields}`,
      },
      validateFormat: {
        condition: validateFormat,
        message: 'Invalid date format. Expected dd/mm/yyyy',
      },
      checkDate: {
        condition: checkDate,
        message: 'The date must be no earlier than today.',
      },
      campaignEnd: {
        condition: campaignEnd,
        message: `The campaign was finished on: ${campaignEnd}`,
      },
    };

    for (const key in validations) {
      if (validations[key].condition) {
        throw new UnauthorizedError(validations[key].message);
      }
    }

    const campaign = await this.prismaService.campaign.create({
      data: { name, startDate: start, endDate: end, status, category },
    });
    return { campaign };
  }

  async findAll(status?: StatusType) { 
    if(status) {
      return await this.findByCampaignStatus(status)
    }
    const campaigns = await this.prismaService.campaign.findMany();
    return { campaigns };
  }

  async findByCampaignStatus(status: StatusType) {
    const statusType = status.toUpperCase() as StatusType;

    if(statusTypeIsValid(statusType)) {
      const campaignsByStatus = await this.prismaService.campaign.findMany({
        where: {status: statusType}
      })
      return {campaigns: campaignsByStatus}
    }

    throw new BadRequestError("This status is not valid!")
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
    const {campaign} = await this.findOne(id);

    if(campaign.status === StatusType.PAUSED) {
      throw new BadRequestError("This campaign is already Paused")
    }
    const deleted = await this.prismaService.campaign.update({
      data: {...campaign, status: StatusType.PAUSED},
      where: { id },
    });
    return { deleted };
  }
}
