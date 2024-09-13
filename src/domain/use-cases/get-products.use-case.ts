import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

interface GetProductsUseCase {
  execute(): Promise<Product[]>;
}

@Injectable()
export class GetProducts implements GetProductsUseCase {
  constructor(
    @Inject('ProductRepositoryCustom')
    private readonly productRepository: ProductRepository,
  ) {}
  execute(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}
