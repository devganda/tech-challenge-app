import { Customer } from "@domain/entities/Customer";

export interface CustomerRepository {
   findByCPF(cpf: string): Promise<Customer | null>;
   save(customer: Customer): Promise<void>;
}