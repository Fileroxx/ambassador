import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {

constructor(
    private readonly productService: ProductService
){
}

@Get('api/admin/products')
    async all() {
        return this.productService.find({})
    }

@Post('api/admin/products')
    async create(@Body() body: ProductCreateDto) {
        return this.productService.save(body);
    }

@Get('api/admin/products/:id')
    async get(@Param('id') id: number) {
        return this.productService.findOne({id});
    }

@Put('api/admin/products/:id')
    async update(
        @Param('id') id: number,
        @Body() body: ProductCreateDto

    ) {
        await this.productService.update(id, body);

        return this.productService.findOne({id})
    }


@Delete('api/admin/products/:id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id)
    }


}
