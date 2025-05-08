export class Name {
   constructor(private readonly value: string) {
      this.validate();
   }

   private validate() {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(this.value)) {
         throw new Error('Invalid name format');
      }

      // Deixar sempre a primeira letra Maiuscula e o resto minusculo
      this.value.split(' ')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
         .join(' ');
   }

   public getValue(): string {
      return this.value;
   }
}