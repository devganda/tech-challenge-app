import { User } from '@domain/entities/User';
import { Name } from '@domain/value-objects/Name';
import { Email } from '@domain/value-objects/Email';
import { CreatedAt } from '@domain/value-objects/CreatedAt';


interface RawUser {
   id: string;
   name: string;
   email: string;
   createdAt: Date;
}

interface HttpUser {
   id: string;
   name: string;
   email: string;
   createdAt: string;
}

export class UserMapper {

   static toHTTP(user: User): HttpUser {
      return {
         id: user.id,
         name: user.name.getValue(),
         email: user.email.getValue(),
         createdAt: user.createdAt.toISOString(),
      };
   }


   static toPersistence(user: User): RawUser {
      return {
         id: user.id,
         name: user.name.getValue(),
         email: user.email.getValue(),
         createdAt: user.createdAt.getValue(),
      };
   }


   static toDomain(raw: RawUser): User {
      return new User({
         id: raw.id,
         name: new Name(raw.name),
         email: new Email(raw.email),
         createdAt: new CreatedAt(raw.createdAt),
      });
   }
}