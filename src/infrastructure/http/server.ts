import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import Redis from '@infrastructure/redis/redis'
import { prisma } from '@infrastructure/database/prisma';
import UserRoute from '@routes/UserRoute';
import ProductRoute from '@routes/ProductRoute';
import PaymentRoute from '@routes/PaymentRoute';
import AdminRoute from '@routes/AdminRoute';
import OrderRoute from '@routes/OrderRoute';
import CustomerRoute from '@routes/CustomerRoute';

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
         schemes: ['http'],
         consumes: ['application/json'],
         produces: ['application/json'],
         tags: [
            { name: 'Users', description: 'Operações relacionadas aos usuários' }
         ],
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
      const message = await Redis.get('welcome');
      return { message }
   });

   app.register(UserRoute, { prefix: '/users' });
   app.register(CustomerRoute, { prefix: '/customer' });
   app.register(ProductRoute, { prefix: '/products' });
   app.register(OrderRoute, { prefix: '/orders' });
   app.register(AdminRoute, { prefix: '/admin' });
   app.register(PaymentRoute, { prefix: '/payment' });


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