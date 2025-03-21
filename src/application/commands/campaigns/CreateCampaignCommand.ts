import { ICommand } from '@nestjs/cqrs';

export class CreateCampaignCommand implements ICommand {
  constructor(
    public readonly user_id: number,
    public readonly name: string,
    public readonly process_date: string, 
    public readonly process_hour: string,
    public readonly process_status: number,
    public readonly phone_list: string,
    public readonly message_text: string,
  ) {}
}
