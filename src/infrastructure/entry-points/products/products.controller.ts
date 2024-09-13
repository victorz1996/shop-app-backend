import { GetProducts } from './../../../domain/use-cases/get-products.use-case';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateProductDto } from 'src/domain/dtos';

@Controller('products')
export class ProductsController {
  constructor(private readonly getProducts: GetProducts) {}

  @Get()
  async findAll() {
    const products = await this.getProducts.execute();
    return { success: true, count: products.length, data: products };
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return id;
  }

  @Patch(':id')
  async update(@Param(':id') id, @Body() input: UpdateProductDto) {
    return input;
  }
}
