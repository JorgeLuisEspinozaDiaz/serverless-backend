import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCampaignCommand } from '../../application/commands/campaigns/CreateCampaignCommand';
import { CreateCampaignDto } from '../../application/commands/campaigns/CreateCampaignDTO';
import { SendCampaignCommand } from '../../application/commands/campaigns/sent/send-campaign.command';
import { GetCampaignsQuery } from '../../application/Queries/campaigns/list/get-campaigns.query';
import { Campaign } from '../../domain/entities/campaign.entity';

@ApiTags('Campaigns')
@Controller('api/campaigns')
export class CampaignController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtiene la lista de campañas',
    description: 'Retorna campañas filtradas por fecha de inicio y fin.',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    example: '2024-03-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    example: '2024-03-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de campañas por rango de fechas ',
    type: [Campaign],
  })
  async getCampaigns(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<Campaign[]> {
    return this.queryBus.execute(new GetCampaignsQuery(startDate, endDate));
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva campaña' }) // Describe qué hace este endpoint
  @ApiResponse({ status: 201, description: 'Campaña creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    return this.commandBus.execute(
      new CreateCampaignCommand(
        createCampaignDto.user_id,
        createCampaignDto.name,
        createCampaignDto.process_date,
        createCampaignDto.process_hour,
        createCampaignDto.process_status,
        createCampaignDto.phone_list,
        createCampaignDto.message_text,
      ),
    );
  }

  @Post(':id/send')
  @ApiOperation({ summary: 'Enviar campaña', description: 'Ejecuta el envío de mensajes de una campaña específica.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la campaña a enviar' })
  @ApiResponse({ status: 200, description: 'La campaña está siendo procesada.' })
  @ApiResponse({ status: 404, description: 'Campaña no encontrada.' })
  async sendCampaign(@Param('id') id: number) {
    await this.commandBus.execute(new SendCampaignCommand(id));
    return { message: 'Campaign is being processed' };
  }
}
