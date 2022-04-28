import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { Order } from './order';
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
}
