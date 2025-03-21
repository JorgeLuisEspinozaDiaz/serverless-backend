import { Customer } from "../entities/customer.entity";

 
 
 
export interface CustomerRepository {
  findById(id: string): Promise<Customer | null>;
  save(user: Customer): Promise<Customer>;
}
