import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "../../domain/entities/message.entity";
import { MessageRepository } from "../../domain/repositories/message.repository";
import { Repository } from "typeorm";

@Injectable()
export class MessageRepositoryImpl implements MessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findById(id: string): Promise<Message | null> {
    return this.messageRepository.findOne({ where: { id: Number(id) } });
  }

  async save(message: Message): Promise<Message> {
    return this.messageRepository.save(message);
  }
}