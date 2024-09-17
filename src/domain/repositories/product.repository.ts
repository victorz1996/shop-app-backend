import { UpdateProductDto } from './../dtos/update-product.dto';
import { Product } from '../entities/product.entity';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getOneById(id: string): Promise<Product>;
  updateProduct(updateProductDto: UpdateProductDto): Promise<Product>;
}
