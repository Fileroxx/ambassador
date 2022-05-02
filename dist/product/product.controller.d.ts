import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { ProductCreateDto } from './dtos/product-create.dto';
import { Product } from './product';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    private cacheManager;
    private eventEmitter;
    constructor(productService: ProductService, cacheManager: Cache, eventEmitter: EventEmitter2);
    all(): Promise<any[]>;
    create(body: ProductCreateDto): Promise<any>;
    get(id: number): Promise<any>;
    update(id: number, body: ProductCreateDto): Promise<any>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    frontend(): Promise<any[]>;
    backend(request: Request): Promise<{
        data: Product[];
        total: number;
        page: number;
        last_page: number;
    }>;
}
