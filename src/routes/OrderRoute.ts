import { FastifyInstance } from 'fastify';
import { CreateOrder } from '@application/use-cases/CreateOrder';
import { PrismaOrderRepository } from '@infrastructure/repositories/PrismaOrderRepository';
import { PrismaProductRepository } from '@infrastructure/repositories/PrismaProductRepository';
import { OrderMapper } from '@infrastructure/mappers/OrderMapper';

export default async function OrderRoute(app: FastifyInstance) {

   app.post('/',
      {
         schema: {
            summary: 'Cria uma nova ordem de pedido',
            description: 'Este endpoint cria uma nova ordem de pedido no sistema',
            tags: ['Orders'],
            body: {
               type: 'object',
               properties: {
                  customerId: {
                     type: 'string',
                     description: 'ID do cliente que está fazendo o pedido'
                  },
                  items: {
                     type: 'array',
                     items: {
                        type: 'string'
                     },
                     description: 'Lista de IDs dos produtos incluídos no pedido'
                  }
               },
               required: ['customerId', 'items']
            },
            response: {
               201: {
                  description: 'Pedido criado com sucesso',
                  type: 'object',
                  properties: {

                     id: { type: 'string', description: 'ID da ordem' },
                     customerId: { type: 'string', description: 'ID do cliente' },
                     items: { type: 'array', description: 'IDs dos produtos' },
                     status: { type: 'string', description: 'Status do pedido' },
                     createdAt: { type: 'string', description: 'Data de criação do pedido' }
                  }
               },
               400: {
                  description: 'Erro ao criar o pedido',
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
            const { customerId, items } = request.body as {
               customerId: string;
               items: string[];
            };

            const orderRepository = new PrismaOrderRepository();
            const productRepository = new PrismaProductRepository();
            const createOrder = new CreateOrder(orderRepository, productRepository);
            const order = await createOrder.execute({ customerId, productIds: items });

            return reply.status(201).send(OrderMapper.toHTTP(order));
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );

   app.get('/:id/status', async (request, reply) => {
      // Buscar status do pedido
      return reply.send({ status: 'EM_PREPARACAO' });
   });
}