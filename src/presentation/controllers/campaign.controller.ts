import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampaignService } from '../../application/services/campaign.service';
import { CampaignBodyDTO } from '../../application/DTO/campaign-body-dto';
import { Created, Ok } from '../responses/success.types';
import { Public } from '../decorators/public.decorator';

//company controller
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  //create a new company
  @Public()
  @Post()
  async create(@Body() createCampaignDto: CampaignBodyDTO) {
    const campaign = await this.campaignService.create(createCampaignDto);
    return new Created(campaign);
  }

  //get all campaign
  @Get()
  async findAll() {
    const campaign = await this.campaignService.findAll();
    return new Ok(campaign);
  }

  //get company by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const campaign = await this.campaignService.findOne(String(id));
    return new Ok(campaign);
  }

  //Update company
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CampaignBodyDTO>,
  ) {
    const campaign = await this.campaignService.update(String(id), body);
    return new Ok(campaign);
  }

  //delete company
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const campaign = await this.campaignService.remove(String(id));
    return new Ok(campaign);
  }
}
