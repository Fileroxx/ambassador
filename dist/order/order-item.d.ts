import { Order } from './order';
export declare class OrderItem {
    id: number;
    product_title: string;
    price: number;
    quantity: number;
    admin_revenue: number;
    ambassador_revenue: number;
    order: Order;
}
