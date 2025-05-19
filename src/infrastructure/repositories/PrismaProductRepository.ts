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