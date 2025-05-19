export class OptionalName {

   constructor(private readonly value: string) {
      this.value = OptionalName.format(value);
      this.validate();
   }

   private validate() {
      if (this.value.length > 0) {
         const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
         if (!nameRegex.test(this.value)) {
            throw new Error('Formato de nome inválido');
         }
      }

      if (this.value.length > 100) {
         throw new Error('Nome muito longo');
      }
   }

   private static format(value: string): string {
      return value
         .trim()
         .split(/\s+/)
         .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
         )
         .join(' ');
   }

   public getValue(): string {
      return this.value;
   }

   public isEmpty(): boolean {
      return this.value.length === 0;
   }

   public equals(other: OptionalName): boolean {
      return this.value === other.getValue();
   }
}