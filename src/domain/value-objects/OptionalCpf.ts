export class OptionalCpf {

   constructor(private readonly value: string) {
      const cleaned = OptionalCpf.clean(value);
      this.validate(cleaned);
      this.value = cleaned;
   }

   private validate(cpf: string): void {
      if (cpf.length === 0) return;

      if (!/^\d{11}$/.test(cpf)) {
         throw new Error('CPF deve conter 11 dígitos numéricos');
      }

      if (!OptionalCpf.isValidCpf(cpf)) {
         throw new Error('CPF inválido');
      }
   }

   private static clean(cpf: string): string {
      return cpf.replace(/\D/g, '');
   }

   public static isValidCpf(cpf: string): boolean {
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

      const calcCheckDigit = (factor: number) =>
         cpf
            .split('')
            .slice(0, factor - 1)
            .reduce((sum, num, index) => sum + parseInt(num) * (factor - index), 0);

      const digit1 = (calcCheckDigit(10) * 10) % 11 % 10;
      const digit2 = (calcCheckDigit(11) * 10) % 11 % 10;

      return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
   }

   public getValue(): string {
      return this.value;
   }

   public getFormatted(): string {
      if (this.isEmpty()) return '';
      return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
   }

   public isEmpty(): boolean {
      return this.value.length === 0;
   }

   public equals(other: OptionalCpf): boolean {
      return this.value === other.getValue();
   }
}