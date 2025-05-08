import Fastify from 'fastify';
//import userRoutes from './routes/user.route';
import dotenv from 'dotenv';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import Redis from '@infrastructure/redis/redis'
import { prisma } from '@infrastructure/database/prisma';

dotenv.config();

export async function startServer() {
   const app = Fastify();

   app.register(fastifySwagger, {
      swagger: {
         info: {
            title: 'Tech Challenge API',
            description: 'API documentation',
            version: '1.0.0'
         },
         host: 'localhost:3000',
         schemes: ['http']
      }
   });

   app.register(fastifySwaggerUI, {
      routePrefix: '/docs',
      uiConfig: {
         docExpansion: 'full',
         deepLinking: false
      }
   });

   app.get('/', async () => {
      await Redis.set('welcome', 'Hello teach challenge!')
      const message = await Redis.get('welcome')
      return { message }
   })

   //app.register(userRoutes, { prefix: '/users' });

   /*disconecta o Prisma quando o servidor for fechado*/
   app.addHook('onClose', async () => {
      await prisma.$disconnect();
   });

   try {
      await app.listen({ port: parseInt(process.env.PORT || '3000'), host: '0.0.0.0' });
      console.log('🚀 Server running');
   } catch (err) {
      console.error(err);
      process.exit(1);
   }
}