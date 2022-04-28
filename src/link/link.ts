import {User} from '../user/user'
import {Product} from '../product/product'
import {Entity, PrimaryGeneratedColumn, Column,  JoinTable, ManyToOne, JoinColumn, ManyToMany, OneToMany,} from 'typeorm'
import { Order } from 'src/order/order';

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;


    @ManyToMany(() => Product)
    @JoinTable({
        name: 'link_products',
        joinColumn: {name: 'link_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'product_id', referencedColumnName: 'id'}
    })
    products: Product[];

    @OneToMany(() => Order, order => order.link,  {
        createForeignKeyConstraints: false
    })

    @JoinColumn({
        referencedColumnName: 'code',
        name: 'code'
    })
    orders: Order[];

}