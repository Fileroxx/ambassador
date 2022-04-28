import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './product';

@Injectable()
export class ProductService extends AbstractService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product> 
    ) {
        super(productRepository)
    }
}
