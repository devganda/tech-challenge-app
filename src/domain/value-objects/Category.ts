export class Category {
   private static readonly VALID_CATEGORIES = [
      'LANCHES',
      'ACOMPANHAMENTOS',
      'BEBIDAS',
      'SOBREMESAS',
   ] as const;

   public static readonly LANCHES = new Category('LANCHES');
   public static readonly ACOMPANHAMENTOS = new Category('ACOMPANHAMENTOS');
   public static readonly BEBIDAS = new Category('BEBIDAS');
   public static readonly SOBREMESAS = new Category('SOBREMESAS');

   private constructor(private readonly value: string) { }

   public static create(value: string): Category {

      if (!this.VALID_CATEGORIES.includes(value as any)) {
         throw new Error(`categoria inválida: ${value}`);
      }

      return new Category(value);
   }

   public getValue(): string {
      return this.value;
   }

   public equals(other: Category): boolean {
      return this.value === other.getValue();
   }

   public toString(): string {
      return this.value;
   }
}