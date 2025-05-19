import { OptionalCpf } from '@domain/value-objects/OptionalCpf';
import { OptionalEmail } from '@domain/value-objects/OptionalEmail';
import { OptionalName } from '@domain/value-objects/OptionalName';
import { Customer } from '@domain/entities/Customer';
import { CustomerRepository } from '@domain/repositories/CustomerRepository';

interface RegisterCustomerInput {
   cpf?: OptionalCpf;
   name?: OptionalName;
   email?: OptionalEmail;
}

export class RegisterCustomer {
   constructor(private customerRepository: CustomerRepository) { }

   async execute(input: RegisterCustomerInput): Promise<Customer> {
      if (input.cpf) {
         const existing = await this.customerRepository.findByCPF(input.cpf.getValue());
         if (existing) throw new Error('CPF já cadastrado');
      }

      const customer = Customer.create(input.cpf, input.name, input.email);

      await this.customerRepository.save(customer);

      return customer;
   }
}