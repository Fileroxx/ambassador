import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './product';
export declare class ProductService extends AbstractService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
}
