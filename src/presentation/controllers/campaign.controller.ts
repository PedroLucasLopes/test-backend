import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CampaignService } from '../../application/services/campaign.service';
import { CampaignBodyDTO } from '../../application/DTO/campaign-body-dto';
import { Created, Ok } from '../responses/success.types';
import { Public } from '../decorators/public.decorator';
import { StatusType } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateCampaignDto } from '../../application/DTO/createcampaign-body.dto';

@ApiTags('Campaigns') // Define a tag para agrupar os endpoints relacionados a campanhas
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  // Create a new campaign
  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'Campaign created successfully' })
  @ApiBody({ type: CreateCampaignDto })
  async create(@Body() createCampaignDto: CampaignBodyDTO) {
    const campaign = await this.campaignService.create(createCampaignDto);
    return new Created(campaign);
  }

  // Get all campaigns
  @Get()
  @ApiOperation({ summary: 'Get all campaigns or filter by status' })
  @ApiQuery({ name: 'status', required: false, enum: StatusType, description: 'Filter campaigns by status' })
  @ApiResponse({ status: 200, description: 'List of campaigns' })
  async findAll(@Query("status") status?: StatusType) {
    const campaign = await this.campaignService.findAll(status);
    return new Ok(campaign);
  }

  // Get campaign by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID', type: String })
  @ApiResponse({ status: 200, description: 'Campaign details' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async findOne(@Param('id') id: string) {
    const campaign = await this.campaignService.findOne(String(id));
    return new Ok(campaign);
  }

  // Update campaign
  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID', type: String })
  @ApiBody({ type: CreateCampaignDto })
  @ApiResponse({ status: 200, description: 'Campaign updated successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CampaignBodyDTO>,
  ) {
    const campaign = await this.campaignService.update(String(id), body);
    return new Ok(campaign);
  }

  // Soft delete campaign
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID', type: String })
  @ApiResponse({ status: 200, description: 'Campaign deleted successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async remove(@Param('id') id: string) {
    const campaign = await this.campaignService.remove(String(id));
    return new Ok(campaign);
  }
}