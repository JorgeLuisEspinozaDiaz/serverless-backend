import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../../domain/entities/customer.entity";
import { CustomerRepository } from "../../domain/repositories/customer.repository";
import { Repository } from "typeorm";

@Injectable()
export class  CustomerRepositoryImpl implements CustomerRepository {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }

    async findById(id: string): Promise<Customer | null> {
        return this.customerRepository.findOne({ where: { id: Number(id) } });
    }

    async save(user: Customer): Promise<Customer> {
        return this.customerRepository.save(user);
    }
}
