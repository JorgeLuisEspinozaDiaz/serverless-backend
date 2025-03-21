import { Campaign } from "../entities/campaign.entity";

 
 
export interface CampaignRepository {
  findById(id: string): Promise<Campaign | null>;
  save(user: Campaign): Promise<Campaign>;
}
