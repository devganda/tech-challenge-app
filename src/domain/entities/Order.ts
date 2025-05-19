import { v4 as uuidv4 } from 'uuid';
import { CreatedAt } from "@domain/value-objects/CreatedAt";
import { OrderStatus } from "@domain/value-objects/OrderStatus";
import { OrderItem } from "@domain/value-objects/OrderItem";

interface OrderProps {
   id: string;
   customerId: string;
   items: OrderItem[];
   status: OrderStatus;
   createdAt: CreatedAt;
}

export class Order {
   constructor(
      private readonly props: OrderProps
   ) { }

   get id(): string {
      return this.props.id;
   }

   get customerId(): string {
      return this.props.customerId;
   }

   get items(): OrderItem[] {
      return this.props.items;
   }

   get status(): OrderStatus {
      return this.props.status;
   }

   get createdAt(): CreatedAt {
      return this.props.createdAt;
   }

   public addItem(productId: string) {
      this.props.items.push(new OrderItem(productId));
   }

   public updateStatus(newStatus: OrderStatus) {
      this.props.status = newStatus;
   }

   static create(customerId: string, items: OrderItem[]): Order {
      return new Order({
         id: uuidv4(),
         customerId,
         items,
         status: OrderStatus.RECEBIDO,
         createdAt: CreatedAt.now()
      });
   }
}