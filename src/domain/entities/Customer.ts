import { v4 as uuidv4 } from 'uuid';
import { OptionalName } from "@domain/value-objects/OptionalName";
import { OptionalCpf } from "@domain/value-objects/OptionalCpf";
import { OptionalEmail } from "@domain/value-objects/OptionalEmail";

interface CustomerProps {
   id: string;
   cpf?: OptionalCpf;
   name?: OptionalName;
   email?: OptionalEmail;
}

export class Customer {
   constructor(
      private readonly props: CustomerProps
   ) { }

   get id(): string {
      return this.props.id;
   }

   get cpf(): OptionalCpf | undefined {
      return this.props.cpf;
   }

   get name(): OptionalName | undefined {
      return this.props.name;
   }

   get email(): OptionalEmail | undefined {
      return this.props.email;
   }

   static create(cpf?: OptionalCpf, name?: OptionalName, email?: OptionalEmail): Customer {
      return new Customer({
         id: uuidv4(),
         cpf,
         name,
         email
      });
   }
}