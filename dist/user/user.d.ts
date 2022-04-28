import { Order } from "src/order/order";
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_ambassador: boolean;
    orders: Order[];
    get revenue(): number;
}
