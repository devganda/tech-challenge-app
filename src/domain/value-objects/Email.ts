export class Email {
   constructor(private readonly value: string) {
      this.validate();
   }

   private validate() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
         throw new Error('Invalid email format');
      }
   }

   public getValue(): string {
      return this.value;
   }
}