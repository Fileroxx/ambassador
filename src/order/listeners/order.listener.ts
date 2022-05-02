import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RedisService } from "src/shared/redis.service";
import { Order } from "../order";
import {MailerService} from '@nestjs-modules/mailer'

@Injectable()
export class OrderListener {
    constructor(
        private redisService: RedisService,
        private  mailerService: MailerService
        ){

    }

    @OnEvent('order.completed')
    async handleOrderCompletedEvent(order: Order) {
        const client = this.redisService.getClient();
        client.zincrby('ranking', order.ambassador_revenue, order.user.name);
        
        await this.mailerService.sendMail({
            to: 'admin@admin.com',
            subject: 'An order has been completed',
            html: `Order ${order.id} with a total de ${order.total} has been completed!`
        })

        await this.mailerService.sendMail({
            to: order.ambassador_email,
            subject: 'An order has been completed',
            html: `You earned ${order.ambassador_revenue} with a total de ${order.total} from the link #${order.code}`
        })

    }
}