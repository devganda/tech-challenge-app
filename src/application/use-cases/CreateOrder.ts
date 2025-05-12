import { OrderRepository } from "@domain/repositories/OrderRepository";
import { Order } from "@domain/entities/Order";
import { OrderItem } from "@domain/value-objects/OrderItem";

interface CreateOrderInput {
   customerId: string;
   productIds: string[];
}

export class CreateOrderUseCase {
   constructor(private readonly orderRepository: OrderRepository) { }

   async execute(input: CreateOrderInput): Promise<void> {
      const items = input.productIds.map((id: string) => new OrderItem(id));
      const order = Order.create(input.customerId, items);
      await this.orderRepository.save(order);
   }
}