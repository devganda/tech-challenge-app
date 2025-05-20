import { FastifyInstance } from 'fastify';

export default async function ProductRoute(app: FastifyInstance) {

   app.get('/category/{id}',
      {
         schema: {
            summary: 'Busca os produtos por categoria no sistema',
            description: 'Este endpoint busca os produtos por categoria no sistema',
            tags: ['Products'],
            querystring: {
               type: 'object',
               properties: {
                  id: { type: 'string', description: 'ID da categoria' },
               },
               required: ['id']
            },
            response: {
               200: {
                  description: 'Busca realizada com sucesso',
                  type: 'object',
                  properties: {
                     id: { type: 'string', description: 'ID da categoria' },
                     name: { type: 'string', description: 'Nome da categoria' },
                  }
               },
               400: {
                  description: 'Erro ao buscar a categoria',
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
            const { id } = request.query as { id: string };

            return reply.status(200).send({ true: true });
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );
}