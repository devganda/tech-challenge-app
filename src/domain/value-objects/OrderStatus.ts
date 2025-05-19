export class OrderStatus {
   private static readonly VALID_STATUSES = [
      'RECEBIDO',
      'EM_PREPARACAO',
      'PRONTO',
      'FINALIZADO',
      'CANCELADO'
   ] as const;

   public static readonly RECEBIDO = new OrderStatus('RECEBIDO');
   public static readonly EM_PREPARACAO = new OrderStatus('EM_PREPARACAO');
   public static readonly PRONTO = new OrderStatus('PRONTO');
   public static readonly FINALIZADO = new OrderStatus('FINALIZADO');
   public static readonly CANCELADO = new OrderStatus('CANCELADO');

   private constructor(private readonly value: string) { }

   public static create(value: string): OrderStatus {
      if (!this.VALID_STATUSES.includes(value as any)) {
         throw new Error(`Status de pedido inválido: ${value}`);
      }
      return new OrderStatus(value);
   }

   public getValue(): string {
      return this.value;
   }

   public equals(other: OrderStatus): boolean {
      return this.value === other.getValue();
   }

   public toString(): string {
      return this.value;
   }
}