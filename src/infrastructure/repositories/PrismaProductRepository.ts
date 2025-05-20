import { Product } from '@/src/domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { prisma } from "@infrastructure/database/prisma";

export class PrismaProductRepository implements ProductRepository {
   async save(product: Product) {
      await prisma.product.create({
         data: {
            id: product.id,
            name: product.name,
            price: product.price
         }
      });
   }

   async findByName(name: string): Promise<string[] | null> {
      const product = await prisma.product.findFirst({
         where: { name },
         select: {
            id: true,
            name: true,
            description: true,
            price: true,
            category: true
         }
      });

      if (!product) {
         return null;
      }

      return product;
   }

   async exists(productIds: string[]): Promise<string[]> {
      const products = await prisma.product.findMany({
         where: {
            id: { in: productIds }
         },
         select: { id: true }
      });

      return products.map((p: any) => p.id);
   }
}