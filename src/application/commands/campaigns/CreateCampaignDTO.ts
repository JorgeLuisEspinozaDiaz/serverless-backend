import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ example: 1, description: 'ID del usuario que crea la campaña' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'Promo de verano', description: 'Nombre de la campaña' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-03-19', description: 'Fecha de la campaña (YYYY-MM-DD)' })
  @IsDateString()
  process_date: string;

  @ApiProperty({ example: '14:30:00', description: 'Hora de procesamiento (HH:MM:SS)' })
  @IsString()
  process_hour: string;

  @ApiProperty({ example: 1, description: 'Estado de la campaña' })
  @IsInt()
  process_status: number;

  @ApiProperty({ example: '555-1234,555-5678', description: 'Lista de teléfonos separados por comas' })
  @IsString()
  @IsNotEmpty()
  phone_list: string;

  @ApiProperty({ example: '¡Oferta especial!', description: 'Texto del mensaje' })
  @IsString()
  @IsNotEmpty()
  message_text: string;
}
