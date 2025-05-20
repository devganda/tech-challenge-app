import { Category } from "@domain/entities/Category";

export interface CategoryRepository {
   save(category: Category): Promise<void>;
   findByName(name: string): Promise<string[] | null>;
}