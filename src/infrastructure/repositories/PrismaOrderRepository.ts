import { prisma } from '@infrastructure/database/prisma';
import { OrderRepository } from '@domain/repositories/OrderRepository';
import { Order } from '@domain/entities/Order';
import { create } from 'domain';
import { OrderMapper } from '@infrastructure/mappers/OrderMapper';

export class PrismaOrderRepository implements OrderRepository {
   async save(order: Order) {
      return prisma.order.create({
         data: OrderMapper.toPersistence(order),
      });
   }
}