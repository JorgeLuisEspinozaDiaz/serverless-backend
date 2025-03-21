import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Campaign } from "../../domain/entities/campaign.entity";
import { CampaignRepository } from "../../domain/repositories/campaign.repository";
import { Repository } from "typeorm";


@Injectable()
export class  CampaignRepositoryImpl implements CampaignRepository {
    constructor(
        @InjectRepository(Campaign)
        private readonly  campaignRepository: Repository<Campaign>,
    ) { }

    async findById(id: string): Promise<Campaign | null> {
        return this.campaignRepository.findOne({ where: { id: Number(id) } });
    }

    async save(user: Campaign): Promise<Campaign> {
        return this.campaignRepository.save(user);
    }
}