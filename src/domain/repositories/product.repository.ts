import { Product } from '../entities/product.entity';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getOneById(id: string): Promise<Product>;
}
