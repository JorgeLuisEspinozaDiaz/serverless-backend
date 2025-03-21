import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-users.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../domain/entities/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetUserQuery) 
export class GetUsersHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserQuery): Promise<User[]> {
    return await this.userRepository.find({ select: ['id', 'username'],});

  }
}
