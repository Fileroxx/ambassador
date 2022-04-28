import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    all(): Promise<any[]>;
    create(body: ProductCreateDto): Promise<any>;
    get(id: number): Promise<any>;
    update(id: number, body: ProductCreateDto): Promise<any>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
