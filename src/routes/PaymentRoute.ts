import { FastifyInstance } from 'fastify';

export default async function PaymentRoute(app: FastifyInstance) {

   app.post('/',
      {
         schema: {
            summary: 'Envia o pedido para o pagamento',
            description: 'Este endpoint envia um pedido para o pagamento',
            tags: ['Payment'],
            body: {
               type: 'object',
               properties: {
                  name: { type: 'string', description: 'Nome do usuário' },
                  email: { type: 'string', format: 'email', description: 'Email do usuário' }
               },
               required: ['name', 'email']
            },
            response: {
               201: {
                  description: 'Usuário criado com sucesso',
                  type: 'object',
                  properties: {
                     id: { type: 'string', description: 'ID do usuário' },
                     name: { type: 'string', description: 'Nome do usuário' },
                     email: { type: 'string', format: 'email', description: 'Email do usuário' }
                  }
               },
               400: {
                  description: 'Erro ao criar o usuário',
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
            const { orderId } = request.body as any;
            // Chamada a PaymentService
            return reply.send({ paid: true });
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );
}