import { Product } from "@domain/entities/Product";
import { OrderItem } from "@domain/value-objects/OrderItem";
import { ProductRepository } from "@/src/domain/repositories/ProductRepository";

interface CreateProductInput {
   name: string;
   description: string;
   price: number;
   category: string;
}

export class CreateProduct {
   constructor(
      private readonly productRepository: ProductRepository
   ) { }

   async execute(input: CreateProductInput): Promise<Product> {

      const existingProduct = await this.productRepository.findByName(input.name);
      if (existingProduct) {
         throw new Error('Produto com este nome já existe');
      }

      const product = Product.create(input.name, input.description, input.price, input.category);
      await this.productRepository.save(product);

      return product;
   }
}