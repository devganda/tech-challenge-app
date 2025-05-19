
export class OrderItem {
   constructor(private readonly productId: string) {
      if (!productId || productId.trim() === '') {
         throw new Error('Produto inválido no item do pedido');
      }
   }

   public getValue(): { productId: string } {
      return { productId: this.productId };
   }

   public equals(other: OrderItem): boolean {
      return this.productId === other.getValue().productId;
   }
}