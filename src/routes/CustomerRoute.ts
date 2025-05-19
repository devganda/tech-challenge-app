import { FastifyInstance } from 'fastify';
import { PrismaCustomerRepository } from '@infrastructure/repositories/PrismaCustomerRepository';
import { RegisterCustomer } from '@application/use-cases/RegisterCustomer';
import { OptionalEmail } from '@domain/value-objects/OptionalEmail';
import { OptionalName } from '@domain/value-objects/OptionalName';
import { OptionalCpf } from '@domain/value-objects/OptionalCpf';

export default async function CustomerRoute(app: FastifyInstance) {

   app.post('/',
      {
         schema: {
            summary: 'Cria um cliente',
            description: 'Este endpoint cria uma cliente no sistema',
            tags: ['Customers'],
            body: {
               type: 'object',
               properties: {
                  name: {
                     type: 'string',
                     description: 'Nome do cliente'
                  },
                  cpf: {
                     type: 'string',
                     description: 'Cpf do cliente'
                  },
                  email: {
                     type: 'string',
                     description: 'Email do cliente'
                  }
               },
            },
            response: {
               201: {
                  description: 'Cliente registrado com sucesso!',
                  type: 'object',
                  properties: {

                     id: { type: 'string', description: 'ID do cliente' },
                     name: { type: 'string', description: 'Nome do cliente' },
                     cpf: { type: 'string', description: 'Cpf do cliente' },
                     email: { type: 'string', description: 'Email do cliente' }
                  }
               },
               400: {
                  description: 'Erro ao criar o cliente',
                  type: 'object',
                  properties: {
                     error: { type: 'string', description: 'Mensagem de erro' }
                  }
               }
            }
         }
      },

      async (request, reply) => {

         try {
            const { name, cpf, email } = request.body as {
               name?: string;
               cpf?: string;
               email?: string;
            };

            const optionalCpf = new OptionalCpf(cpf ?? '');
            const optionalName = new OptionalName(name ?? '');
            const optionalEmail = new OptionalEmail(email ?? '');

            const customerRepository = new PrismaCustomerRepository();
            const registerCustomer = new RegisterCustomer(customerRepository);
            const customer = await registerCustomer.execute({ cpf: optionalCpf, name: optionalName, email: optionalEmail });

            return reply.status(201).send({ success: true });
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );
}