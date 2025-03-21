import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../domain/entities/user.entity";
 import { UserRepository } from "../../domain/repositories/user.repository";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: Number(id) } });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}