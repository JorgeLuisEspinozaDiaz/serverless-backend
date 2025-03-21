import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../../../domain/entities/campaign.entity';
import { CreateCampaignCommand } from './CreateCampaignCommand';
 
@CommandHandler(CreateCampaignCommand)
export class CreateCampaignHandler implements ICommandHandler<CreateCampaignCommand> {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async execute(command: CreateCampaignCommand): Promise<Campaign> {
    const {
      user_id,
      name,
      process_date,
      process_hour,
      process_status,
      phone_list,
      message_text,
    } = command;

    const newCampaign = this.campaignRepository.create({
      user_id,
      name,
      process_date,
      process_hour,
      process_status,
      phone_list,
      message_text,
    });

    return this.campaignRepository.save(newCampaign);
  }
}
