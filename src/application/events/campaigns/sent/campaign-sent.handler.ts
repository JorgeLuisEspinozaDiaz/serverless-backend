import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from '../../../../domain/entities/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignSentEvent } from './campaign-sent.event';
import { Message } from '../../../../domain/entities/message.entity';

@EventsHandler(CampaignSentEvent)
export class CampaignSentHandler implements IEventHandler<CampaignSentEvent> {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async handle(event: CampaignSentEvent): Promise<void> {
    const { campaignId } = event;

    const messages = await this.messageRepo.find({
      where: { campaign_id: campaignId },
    });
    const allSent = messages.every((msg) => msg.shipping_status !== 1);

    if (allSent) {
      const campaign = await this.campaignRepo.findOne({
        where: { id: campaignId },
      });

      if (campaign) {
        campaign.process_status = 3;  
        await this.campaignRepo.save(campaign);
      } else {
        console.warn(`No se encontró la campaña con ID ${campaignId}`);
      }
    }
  }
}
