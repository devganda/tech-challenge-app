import { UserRepository } from "@domain/repositories/UserRepository";
import { User } from "@domain/entities/User";
import { Name } from "@domain/value-objects/Name";
import { Email } from "@domain/value-objects/Email";

interface CreateUserInput {
   name: string;
   email: string;
}

export class CreateUser {
   constructor(private readonly userRepository: UserRepository) { }

   async execute(input: CreateUserInput): Promise<User> {

      const email = new Email(input.email);
      const name = new Name(input.name);

      const existing = await this.userRepository.findByEmail(email.getValue());

      if (existing) {
         throw new Error("Email já está em uso.");
      }

      const user = User.create(name.getValue(), email.getValue());
      await this.userRepository.save(user);

      return user;
   }
}
