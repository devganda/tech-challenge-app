export class OptionalEmail {
   private readonly value: string;

   constructor(value: string) {
      const cleaned = value.trim().toLowerCase();
      this.validate(cleaned);
      this.value = cleaned;
   }

   private validate(email: string): void {
      if (email.length === 0) return;

      const emailRegex =
         /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      if (!emailRegex.test(email)) {
         throw new Error('Formato de e-mail inválido');
      }

      if (email.length > 254) {
         throw new Error('E-mail muito longo');
      }
   }

   public getValue(): string {
      return this.value;
   }

   public isEmpty(): boolean {
      return this.value.length === 0;
   }

   public equals(other: OptionalEmail): boolean {
      return this.value === other.getValue();
   }
}