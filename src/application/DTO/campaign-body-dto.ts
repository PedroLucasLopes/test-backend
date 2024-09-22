import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CampaignType } from '@prisma/client';
import { StatusType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CampaignBodyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Name is used to to show the campaign main title.",
    example: "The Rock Concert"
  })
  name: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: "Every registered campaign has its creation date stored in the database to safeguard information.",
    example: "Sun, 16 Sep 2024 16:00:00"
  })
  signUpDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: "The startDate registers the start date of a campaign in dd/mm/yyyy format.",
    example: "01/03/2024 (dd/mm/yyyy)"
  })
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: "The endDate registers the end date of a campaign in the dd/mm/yyyy format. This date must always be later than the startDate.",
    example: "03/03/2024 (dd/mm/yyyy)"
  })
  endDate: Date;

  @IsOptional()
  @IsEnum(StatusType)
  @ApiProperty({
    description: "The status is an enum that changes the campaign status based on the startDate, endDate, signUpDate, and the actual date when the campaign starts or ends.",
    example: "ACTIVE | PAUSED | EXPIRED"
  })
  status: StatusType;

  @IsNotEmpty()
  @IsEnum(CampaignType)
  @ApiProperty({
    description: "The category is an enum that classifies the campaign type based on a registered category.",
    example: "MARKETING | ADVERTISEMENT [...]"
  })
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
