import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from 'src/domain/dtos';
import { Product } from 'src/domain/entities/product.entity';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.repository.find();
  }

  getOneById(id: string): Promise<Product> {
    return this.repository.findOneBy({ id });
  }

  updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    return this.repository.save(updateProductDto);
  }
}
