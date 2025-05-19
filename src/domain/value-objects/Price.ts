export class Price {

   constructor(private readonly value: number) {
      if (!Price.isValid(value)) {
         throw new Error(`Preço inválido: ${value}`);
      }

      this.value = Price.round(value);
   }

   public getValue(): number {
      return this.value;
   }

   public sum(price: Price): Price {
      return new Price(this.value + price.value);
   }

   public subtract(price: Price): Price {
      return new Price(this.value - price.value);
   }

   public multiply(multiplier: number): Price {
      return new Price(this.value * multiplier);
   }

   public equals(other: Price): boolean {
      return this.value === other.getValue();
   }

   public format(locale = 'pt-BR', currency = 'BRL'): string {
      return new Intl.NumberFormat(locale, {
         style: 'currency',
         currency,
      }).format(this.value);
   }

   private static isValid(value: number): boolean {
      return value >= 0 && !isNaN(value) && isFinite(value);
   }

   private static round(value: number): number {
      return Math.round(value * 100) / 100;
   }
}