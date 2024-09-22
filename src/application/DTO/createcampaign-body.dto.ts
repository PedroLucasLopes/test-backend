import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  import { CampaignType } from '@prisma/client';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateCampaignDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      description: "Name is used to to show the campaign main title.",
      example: "The Rock Concert"
    })
    name: string;
  
    @IsNotEmpty()
    @IsDate()
    @ApiProperty({
      description: "The startDate registers the start date of a campaign in dd/mm/yyyy format.",
      example: "01/03/2025"
    })
    startDate: Date;
  
    @IsNotEmpty()
    @IsDate()
    @ApiProperty({
      description: "The endDate registers the end date of a campaign in the dd/mm/yyyy format. This date must always be later than the startDate.",
      example: "03/03/2025"
    })
    endDate: Date;
  
    @IsNotEmpty()
    @IsEnum(CampaignType)
    @ApiProperty({
      description: "The category is an enum that classifies the campaign type based on a registered category.",
      example: "MARKETING"
    })
    category: CampaignType;
  
    constructor(
      name: string,
      startDate: Date,
      endDate: Date,
      category: CampaignType,
    ) {
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.category = category;
    }
  }
  