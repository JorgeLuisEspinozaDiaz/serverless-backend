import { ICommand } from "@nestjs/cqrs";

export class SendCampaignCommand implements ICommand {
    constructor(public readonly campaignId: number) {}
  }