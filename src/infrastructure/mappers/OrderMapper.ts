import { Order } from '@domain/entities/Order';
import { OrderItem } from '@/src/domain/value-objects/OrderItem';

interface RawOrder {
   id: string;
   customerId: string;
   items: {
      create: {
         productId: string;
      }[];
   };
   status: string;
   createdAt: Date;
}

interface HttpOrder {
   id: string;
   customerId: string;
   items: OrderItem[];
   status: string;
   createdAt: string;
}

export class OrderMapper {

   static toHTTP(order: Order): HttpOrder {
      return {
         id: order.id,
         customerId: order.customerId,
         items: order.items,
         status: order.status.getValue(),
         createdAt: order.createdAt.toISOString(),
      };
   }


   static toPersistence(order: Order): RawOrder {
      return {
         id: order.id,
         customerId: order.customerId,
         status: order.status.getValue(),
         items: {
            create: order.items.map((item: any) => ({ productId: item.getValue().productId }))
         },
         createdAt: order.createdAt.getValue(),
      };
   }
}