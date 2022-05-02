import { LinkService } from 'src/link/link.service';
import { ProductService } from 'src/product/product.service';
import { Connection } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderItemService } from './order-item.service';
import { OrderService } from './order.service';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class OrderController {
    private orderService;
    private orderItemService;
    private linkService;
    private productService;
    private connection;
    private readonly stripeClient;
    private configService;
    private eventEmitter;
    constructor(orderService: OrderService, orderItemService: OrderItemService, linkService: LinkService, productService: ProductService, connection: Connection, stripeClient: Stripe, configService: ConfigService, eventEmitter: EventEmitter2);
    all(): Promise<any[]>;
    create(body: CreateOrderDto): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    confirm(source: string): Promise<{
        message: string;
    }>;
}
