export class GetCampaignsQuery {
  constructor(
    public readonly startDate?: string,
    public readonly endDate?: string,
  ) {}
}
