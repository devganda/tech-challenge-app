import { FastifyInstance } from 'fastify';
import { CreateUser } from '@application/use-cases/CreateUser';
import { PrismaUserRepository } from '@infrastructure/repositories/PrismaUserRepository';
import { UserMapper } from '../infrastructure/mappers/UserMapper';

export async function userRoutes(app: FastifyInstance) {
   const userRepository = new PrismaUserRepository();

   app.post('/', async (request, reply) => {
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
   });
}