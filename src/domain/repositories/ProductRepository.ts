import { Product } from "@domain/entities/Product";

export interface ProductRepository {
   save(order: Product): Promise<void>;
   findByName(name: string): Promise<string[] | null>;
   exists(productIds: string[]): Promise<string[]>;
}