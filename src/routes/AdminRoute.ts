import { FastifyInstance } from 'fastify';
import { PrismaCategoryRepository } from '@infrastructure/repositories/PrismaCategoryRepository';
import { CreateCategory } from '@application/use-cases/CreateCategory';
import { CategoryMapper } from '../infrastructure/mappers/CategoryMapper';

export default async function AdminRoute(app: FastifyInstance) {

   app.post('/category',
      {
         schema: {
            summary: 'Cria uma categoria de produto no sistema',
            description: 'Este endpoint cria uma categoria de produto no sistema',
            tags: ['Admin'],
            body: {
               type: 'object',
               properties: {
                  name: { type: 'string', description: 'Nome da categoria' }
               },
               required: ['name']
            },
            response: {
               200: {
                  description: 'Categoria criada com sucesso!',
                  type: 'object',
                  properties: {
                     id: { type: 'string', description: 'ID da categoria' },
                     name: { type: 'string', description: 'Nome da categoria' }
                  }
               },
               400: {
                  description: 'Erro ao criar a categoria',
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
            const { name } = request.body as { name: string };

            const categoryRepository = new PrismaCategoryRepository();
            const createCategory = new CreateCategory(categoryRepository);
            const category = await createCategory.execute({ name });

            return reply.status(201).send(CategoryMapper.toHTTP(category));
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );

   app.get('/category',
      {
         schema: {
            summary: 'Cria uma categoria de produto no sistema',
            description: 'Este endpoint cria uma categoria de produto no sistema',
            tags: ['Admin'],
            response: {
               200: {
                  description: 'Busca realizada com sucesso!',
                  type: 'object',
                  properties: {
                     id: { type: 'string', description: 'ID da categoria' },
                     name: { type: 'string', description: 'Nome da categoria' }
                  }
               },
               400: {
                  description: 'Erro ao buscar as categorias',
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
            const { name } = request.body as { name: string };

            const categoryRepository = new PrismaCategoryRepository();
            const createCategory = new CreateCategory(categoryRepository);
            const category = await createCategory.execute({ name });

            return reply.status(201).send(CategoryMapper.toHTTP(category));
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );

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