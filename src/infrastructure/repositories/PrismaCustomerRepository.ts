import { prisma } from '@infrastructure/database/prisma';
import { CustomerRepository } from '@domain/repositories/CustomerRepository';
import { Customer } from '@domain/entities/Customer';

export class PrismaCustomerRepository implements CustomerRepository {
   async findByCPF(cpf: string): Promise<Customer | null> {
      const customer = await prisma.customer.findUnique({
         where: { cpf },
      });

      if (!customer) return null;

      return new Customer({
         id: customer.id,
         cpf: customer.cpf,
         name: customer.name,
         email: customer.email,
      });
   }

   async save(customer: Customer): Promise<void> {
      await prisma.customer.create({
         data: {
            id: customer.id,
            cpf: customer.cpf?.getValue(),
            name: customer.name?.getValue(),
            email: customer.email?.getValue(),
         },
      });
   }
}