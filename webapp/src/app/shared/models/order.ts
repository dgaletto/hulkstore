import { Product } from './product';
import { User } from './user';

export class Order {
  id?: string;
  date: Date;
  products: Product[];
  user: User;
}
