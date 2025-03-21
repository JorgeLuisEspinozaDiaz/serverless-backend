import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio.Twilio;
  private from: string;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.from = this.configService.get<string>('TWILIO_PHONE_NUMBER') || '';
    
    if (!accountSid || !authToken || !this.from) {
      throw new Error('Faltan configuraciones de Twilio en las variables de entorno');
    }

    this.client = Twilio(accountSid, authToken);
  }

  async sendSms(to: string, message: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: message,
        from: this.from,
        to,
      });
    } catch (error) {
      console.error('Error enviando SMS con Twilio:', error);
      throw new Error('No se pudo enviar el mensaje');
    }
  }
}
