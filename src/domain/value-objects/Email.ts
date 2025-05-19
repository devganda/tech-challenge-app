export class Email {
   constructor(private readonly value: string) {
      this.validate();
   }

   private validate() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
         throw new Error('Formato de e-mail inválido');
      }

      if (this.value.length > 254) {
         throw new Error('E-mail muito longo');
      }
   }

   public getValue(): string {
      return this.value;
   }

   public isEmpty(): boolean {
      return this.value.length === 0;
   }

   public equals(other: Email): boolean {
      return this.value === other.getValue();
   }
}