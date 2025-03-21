import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCampaignsQuery } from './get-campaigns.query';
import { Campaign } from '../../../../domain/entities/campaign.entity';
import { CampaignStatus, CampaignStatusText } from 'src/domain/enums/campaign-status.enum';
import { formatDate } from 'src/infrastructure/utils/formater/formater';


 
@QueryHandler(GetCampaignsQuery)
export class GetCampaignsHandler implements IQueryHandler<GetCampaignsQuery> {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async execute(query: GetCampaignsQuery): Promise<Campaign[]> {
    const { startDate, endDate } = query;

    const qb = this.campaignRepository
    .createQueryBuilder('campaign')
    .leftJoin('campaign.user', 'user')  
    .select([
      'campaign.id',
      'campaign.name',
      'campaign.process_date',
      'campaign.process_hour',
      'campaign.process_status',
      'campaign.phone_list',
      'campaign.message_text',
      'user.username AS user_name',  
    ]);
   
    if (startDate && endDate) {
      qb.where('campaign.process_date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    } else if (startDate) {
      qb.where('campaign.process_date >= :startDate', { startDate });
    } else if (endDate) {
      qb.where('campaign.process_date <= :endDate', { endDate });
    }

    const results = await qb.getRawMany();
    console.log(results);
    return results.map(campaign => ({
      ...campaign,
      process_status: CampaignStatusText[campaign.campaign_process_status],
      campaign_process_date: formatDate(campaign.campaign_process_date), 
    }));
    
  }
}
