import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { CampaignRepositoryImpl } from './repositories/campaign.repository.impl';
import { CustomerRepositoryImpl } from './repositories/customer.repository.impl';
import { MessageRepositoryImpl } from './repositories/message.repository.impl';
import { Campaign } from '../domain/entities/campaign.entity';
import { Customer } from '../domain/entities/customer.entity';
import { Message } from '../domain/entities/message.entity';
import { User } from '../domain/entities/user.entity';
import { GetCampaignsHandler } from '../application/Queries/campaigns/list/get-campaigns.Handler';
import { CampaignController } from '../api/Controllers/campaigns.controller';
import { CreateCampaignHandler } from '../application/commands/campaigns/CreateCampaignHandler';
import { UserController } from '../api/Controllers/user.controller';
import { GetUsersHandler } from '../application/Queries/users/list/get-users.Handler';
import { MessageController } from '../api/Controllers/messages.controller';
import { GetMessageByCampaingnsHandler } from '../application/Queries/messages/get-ByCampaigns.Handler';
import { SendCampaignHandler } from '../application/commands/campaigns/sent/send-campaign.handler';
import { TwilioService } from './configuration/twilio.service';
import { CampaignSentHandler } from '../application/events/campaigns/sent/campaign-sent.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Campaign, Customer, Message, User]),
  ],
  providers: [
// Servicios
TwilioService, // <-- REGISTRAR TWILIO SERVICE
    
    // Repositories
    UserRepositoryImpl,
    CampaignRepositoryImpl,
    CustomerRepositoryImpl,
    MessageRepositoryImpl,
   // Query Handlers
   GetCampaignsHandler,
   GetUsersHandler,
   GetMessageByCampaingnsHandler,
   //command Handlers
   CreateCampaignHandler, 
   SendCampaignHandler,CampaignSentHandler
  ],
  exports: [
    CqrsModule,
    UserRepositoryImpl,
    CampaignRepositoryImpl,
    CustomerRepositoryImpl,
    MessageRepositoryImpl,
    TwilioService, 

  ],
  controllers: [CampaignController, UserController, MessageController],

})
export class RepositoriesModule {}
