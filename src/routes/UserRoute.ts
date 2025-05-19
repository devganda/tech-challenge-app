import { FastifyInstance } from 'fastify';
import { CreateUser } from '@application/use-cases/CreateUser';
import { PrismaUserRepository } from '@infrastructure/repositories/PrismaUserRepository';
import { UserMapper } from '@infrastructure/mappers/UserMapper';

export default async function UserRoute(app: FastifyInstance) {
   const userRepository = new PrismaUserRepository();

   app.post('/',
      {
         schema: {
            summary: 'Cria um novo usuário',
            description: 'Este endpoint cria um novo usuário no sistema',
            tags: ['Users'],
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
         const createUser = new CreateUser(userRepository);

         const { name, email } = request.body as {
            name: string;
            email: string;
         };

         try {
            const user = await createUser.execute({ name, email });

            return reply.status(201).send(UserMapper.toHTTP(user));
         } catch (error: any) {
            return reply.status(400).send({ error: error.message });
         }
      }
   );
}