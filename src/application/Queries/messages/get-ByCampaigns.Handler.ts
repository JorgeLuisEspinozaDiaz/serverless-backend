import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMessageByCampaignsQuery } from './get-ByCampaigns.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../../domain/entities/message.entity';
import { Repository } from 'typeorm';
import { MessageStatusText } from 'src/domain/enums/message-status.enun';
import { formatDate } from 'src/infrastructure/utils/formater/formater';

@QueryHandler(GetMessageByCampaignsQuery)
export class GetMessageByCampaingnsHandler
  implements IQueryHandler<GetMessageByCampaignsQuery>
{
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async execute(query: GetMessageByCampaignsQuery): Promise<Message[]> {
    const { campaign_id } = query;
    const results = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.campaign', 'campaign') 
      .where('campaign.id = :campaign_id', { campaign_id })
      .select([
        'message.id', 
        'message.text', 
        'message.phone', 
        'message.process_date', 
        'message.process_hour', 
        'message.shipping_status',  
        'campaign.name AS campaign_name',  
      ])
      .getRawMany(); 

    // 🔥 Convertir `campaign_status` a su equivalente en español

    console.log(results);
    
    return results.map(message => ({
      ...message,
      message_shipping_status: MessageStatusText[message.message_shipping_status], 
      message_process_date: formatDate(message.message_process_date),  
      
    }));
  }
}
