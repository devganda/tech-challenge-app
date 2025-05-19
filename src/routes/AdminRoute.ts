import { FastifyInstance } from 'fastify';

export default async function AdminRoute(app: FastifyInstance) {

   app.post('/products',
      {
         schema: {
            summary: 'Cria um produto',
            description: 'Este endpoint cria um produto no sistema',
            tags: ['Admin'],
            body: {
               type: 'object',
               properties: {
                  name: { type: 'string', description: 'Nome do produto' },
                  description: { type: 'string', description: 'Descrição do produto' },
                  price: { type: 'string', description: 'Preço do produto' },
                  category: { type: 'string', description: 'Categoria do Produto' },
               },
               required: ['name', 'email']
            },
            response: {
               201: {
                  description: 'Produto criado com sucesso!',
                  type: 'object',
                  properties: {
                     id: { type: 'string', description: 'ID do produto' },
                     name: { type: 'string', description: 'Nome do produto' },
                     price: { type: 'string', description: 'Preço do produto' },
                     category: { type: 'string', description: 'Categoria do produto' },
                  }
               },
               400: {
                  description: 'Erro ao criar o produto',
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

            return reply.send({ success: true });
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );

   app.get('/orders', async (request, reply) => {
      // Listar pedidos
      return reply.send([]);
   });
}