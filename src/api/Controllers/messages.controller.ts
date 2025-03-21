import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMessageByCampaignsQuery } from '../../application/Queries/messages/get-ByCampaigns.query';
import { Message } from '../../domain/entities/message.entity';

@ApiTags('Mensajes')
@Controller('api/messages')
export class MessageController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('campaign/:id')
  @ApiOperation({ summary: 'Obtener mensajes por campaña' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la campaña',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de mensajes',
    type: [Message],
  })
  async getMessagesByCampaign(
    @Param('id') id: number,
  ): Promise<Message[]> {
    return this.queryBus.execute(new GetMessageByCampaignsQuery(id));
  }
}
