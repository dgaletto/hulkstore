import { Product } from './product';
import { User } from './user';

export class Market {
  id?: string;
  date: Date;
  products: Product[];
  user: User;
}
