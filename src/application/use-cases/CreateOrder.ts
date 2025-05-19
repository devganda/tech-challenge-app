import { OrderRepository } from "@domain/repositories/OrderRepository";
import { Order } from "@domain/entities/Order";
import { OrderItem } from "@domain/value-objects/OrderItem";
import { ProductRepository } from "@/src/domain/repositories/ProductRepository";

interface CreateOrderInput {
   customerId: string;
   productIds: string[];
}

export class CreateOrder {
   constructor(
      private readonly orderRepository: OrderRepository,
      private readonly productRepository: ProductRepository,
   ) { }

   async execute(input: CreateOrderInput): Promise<Order> {

      const existingProductIds = new Set(
         await this.productRepository.exists(input.productIds)
      );

      const invalidIds = input.productIds.filter(id => !existingProductIds.has(id));

      if (invalidIds.length > 0) {
         throw new Error(`Produtos inválidos: ${invalidIds.join(", ")}`);
      }

      const items = input.productIds.map((id: string) => new OrderItem(id));
      const order = Order.create(input.customerId, items);
      await this.orderRepository.save(order);

      return order;
   }
}