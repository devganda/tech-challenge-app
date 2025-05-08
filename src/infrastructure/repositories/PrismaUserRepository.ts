import { prisma } from '@infrastructure/database/prisma';
import { UserRepository } from '@domain/repositories/UserRepository';
import { UserMapper } from '@infrastructure/mappers/UserMapper';
import { User } from '@domain/entities/User';

export class PrismaUserRepository implements UserRepository {

   async findById(id: string): Promise<User | null> {
      const data = await prisma.user.findUnique({
         where: { id }
      });

      if (!data) return null;

      return UserMapper.toDomain(data);
   }

   async save(user: User): Promise<void> {
      await prisma.user.create({
         data: UserMapper.toPersistence(user)
      });
   }

   async findByEmail(email: string): Promise<User | null> {
      const data = await prisma.user.findUnique({
         where: { email }
      });

      if (!data) return null;

      return UserMapper.toDomain(data);
   }
}