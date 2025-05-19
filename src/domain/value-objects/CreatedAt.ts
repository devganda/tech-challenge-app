export class CreatedAt {
   private readonly value: Date;

   public constructor(date: Date) {
      if (isNaN(date.getTime())) {
         throw new Error('Invalid date for CreatedAt.');
      }

      this.value = date;
      Object.freeze(this); //reforça a imutabilidade
   }

   static now(): CreatedAt {
      return new CreatedAt(new Date());
   }

   static from(dateInput: string | Date): CreatedAt {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return new CreatedAt(date);
   }

   getValue(): Date {
      return this.value;
   }

   toISOString(): string {
      return this.value.toISOString();
   }

   equals(other: CreatedAt): boolean {
      return this.value.getTime() === other.getValue().getTime();
   }
}