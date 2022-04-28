import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item';
export declare class OrderItemService extends AbstractService {
    private readonly orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
}
