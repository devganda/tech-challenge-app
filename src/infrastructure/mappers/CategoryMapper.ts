import { Category } from '@domain/entities/Category';

interface OutputCategory {
   id: string;
   name: string;
}

export class CategoryMapper {
   static toPersistence(category: Category): OutputCategory {
      return {
         id: category.id,
         name: category.name
      };
   }

   static toHTTP(category: Category): OutputCategory {
      return {
         id: category.id,
         name: category.name
      }
   }
}