import { FastifyInstance } from 'fastify';

export default async function ProductRoute(app: FastifyInstance) {

   app.get('/category/{category}',
      {
         schema: {
            summary: 'Busca os produtos por categoria no sistema',
            description: 'Este endpoint busca os produtos por categoria no sistema',
            tags: ['Products'],
            querystring: {
               type: 'object',
               properties: {
                  name: { type: 'string', description: 'Nome do usuário' },
                  email: { type: 'string', format: 'email', description: 'Email do usuário' }
               },
               required: ['name', 'email']
            },
            response: {
               200: {
                  description: 'Busca realizada com sucesso',
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
            const { category } = request.query as { category: string };

            return reply.status(201).send({ true: true });
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );
}