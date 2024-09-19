import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CampaignType } from '@prisma/client';
import { StatusType } from '@prisma/client';

export class CampaignBodyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  signUpDate: Date;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsEnum(StatusType)
  status: StatusType;

  @IsNotEmpty()
  @IsEnum(CampaignType)
  category: CampaignType;

  constructor(
    name: string,
    signUpDate: Date,
    startDate: Date,
    endDate: Date,
    status: StatusType,
    category: CampaignType,
  ) {
    this.name = name;
    this.signUpDate = signUpDate;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.category = category;
  }
}
