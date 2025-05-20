import { CategoryRepository } from "@domain/repositories/CategoryRepository";
import { Category } from "@domain/entities/Category";

interface CategoryInput {
   name: string;
}

export class CreateCategory {
   constructor(
      private readonly categoryRepository: CategoryRepository
   ) { }

   async execute(input: CategoryInput): Promise<Category> {
      const existingCategory = await this.categoryRepository.findByName(input.name);

      if (existingCategory) {
         throw new Error('Categoria com este nome já existe');
      }

      const category = Category.create(input.name);
      await this.categoryRepository.save(category);

      return category
   }
}