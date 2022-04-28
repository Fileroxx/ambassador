import { User } from '../user/user';
import { Product } from '../product/product';
import { Order } from 'src/order/order';
export declare class Link {
    id: number;
    code: string;
    user: User;
    products: Product[];
    orders: Order[];
}
