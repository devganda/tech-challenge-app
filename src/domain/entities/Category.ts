import { v4 as uuidv4 } from 'uuid';
import { Name } from '../value-objects/Name';


interface CategoryProps {
   id: string;
   name: Name;
}

export class Category {
   constructor(
      private readonly props: CategoryProps
   ) { }

   get id(): string {
      return this.props.id;
   }

   get name(): string {
      return this.props.name.getValue();
   }

   static create(name: string): Category {
      return new Category({
         id: uuidv4(),
         name: new Name(name)
      });
   }
}