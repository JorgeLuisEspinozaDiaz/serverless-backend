import { IEvent } from '@nestjs/cqrs';

export class CampaignSentEvent implements IEvent {
  constructor(public readonly campaignId: number) {}
}
