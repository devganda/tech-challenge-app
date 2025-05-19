import { v4 as uuidv4 } from 'uuid';
import { Name } from '@domain/value-objects/Name';
import { Description } from '@domain/value-objects/Description';
import { Price } from '@domain/value-objects/Price';
import { Category } from '@domain/value-objects/Category';

interface ProductProps {
   id: string;
   name: Name;
   description: Description;
   price: Price;
   category: Category;
}

export class Product {
   constructor(
      private readonly props: ProductProps
   ) { }

   get id(): string {
      return this.props.id;
   }

   get name(): Name {
      return this.props.name;
   }

   get description(): Description {
      return this.props.description;
   }

   get price(): Price {
      return this.props.price;
   }

   get category(): Category {
      return this.props.category;
   }

   static create(name: string, description: string, price: number, category: string): Product {
      return new Product({
         id: uuidv4(),
         name: new Name(name),
         description: new Description(description),
         price: new Price(price),
         category: Category.create(category)
      });
   }
}
