import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { RepositoriesModule } from './infrastructure/repositories.module';
import { CampaignController } from './api/Controllers/campaigns.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';  

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'database-1.car22e4gqefr.us-east-1.rds.amazonaws.com',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'admin123',
      database: process.env.DB_NAME || 'marketing-prueba',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        connectionLimit: 10,   
        connectTimeout: 20000,  
        waitForConnections: true,  
      },
    }),
    CqrsModule,
    RepositoriesModule,
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
