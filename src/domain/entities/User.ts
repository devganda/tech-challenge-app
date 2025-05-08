import { v4 as uuidv4 } from 'uuid';
import { Email } from "@domain/value-objects/Email";
import { Name } from "@domain/value-objects/Name";
import { CreatedAt } from "@domain/value-objects/CreatedAt";

interface UserProps {
   id: string;
   name: Name;
   email: Email;
   createdAt: CreatedAt;
}

interface UserRestoreProps {
   id: string;
   name: string;
   email: string;
   createdAt: Date;
}

export class User {

   constructor(
      private readonly props: UserProps
   ) { }

   get id(): string {
      return this.props.id;
   }

   get name(): Name {
      return this.props.name;
   }

   get email(): Email {
      return this.props.email;
   }

   get createdAt(): CreatedAt {
      return this.props.createdAt;
   }

   static create(name: string, email: string): User {
      return new User({
         id: uuidv4(),
         name: new Name(name),
         email: new Email(email),
         createdAt: CreatedAt.now()
      });
   }

   static restore(props: UserRestoreProps): User {
      return new User({
         id: props.id,
         name: new Name(props.name),
         email: new Email(props.email),
         createdAt: new CreatedAt(props.createdAt)
      });
   }

};