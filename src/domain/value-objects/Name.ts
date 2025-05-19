export class Name {
   constructor(private readonly value: string) {
      this.value = Name.format(value);
      this.validate();
   }

   private validate() {
      const nameRegex = /^[a-zA-Z\s]+$/;

      if (!this.value || this.value.trim().length === 0) {
         throw new Error('Nome não pode ser vazio');
      }

      if (!nameRegex.test(this.value)) {
         throw new Error('Formato de nome inválido');
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

   public equals(other: Name): boolean {
      return this.value === other.getValue();
   }
}