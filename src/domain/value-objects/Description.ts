export class Description {
   constructor(private readonly value: string) {
      this.validate();
   }

   private validate() {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(this.value)) {
         throw new Error('Formato de descrição inválido');
      }
   }

   public getValue(): string {
      return this.value;
   }
}