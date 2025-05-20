import { prisma } from '@infrastructure/database/prisma';
import { Category } from '@domain/entities/Category';
import { CategoryRepository } from '@domain/repositories/CategoryRepository';
import { CategoryMapper } from '../mappers/CategoryMapper';

export class PrismaCategoryRepository implements CategoryRepository {

   async save(category: Category): Promise<void> {
      await prisma.category.create({
         data: CategoryMapper.toPersistence(category)
      });
   }

   async findByName(name: string): Promise<string[] | null> {
      const categories = await prisma.category.findMany({
         where: { name },
         select: { id: true }
      });

      return categories.length > 0 ? categories.map((category: any) => category.id) : null;
   }
}