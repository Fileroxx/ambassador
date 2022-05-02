import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LinkService } from './link.service';
import { Request } from 'express';
import { Link } from './link';
import { Order } from 'src/order/order';
@Controller()
export class LinkController {
    constructor(
        private linkService: LinkService,
        private authService: AuthService
    ){
    }

    @Get('api/admin/users/:id/links')
    async all(@Param('id') id: number) {
        return this.linkService.find({
            user: id,
            where: {id},
            relations: ['orders', 'orders.order_items']
        });
    }

    @UseGuards(AuthGuard)
    @Post('api/ambassador/links')
    async create(
        @Body('products') products: number[],
        @Req() request: Request
    ) {
        const user = await this.authService.user(request);

        return this.linkService.save({
            code: Math.random().toString(36).substr(6),
            user,
            products: products.map(id => ({id}))
        })
    }

    @Get('api/ambassador/stats')
    async stats(@Req() request: Request) {
        const user = await this.authService.user(request);
 
        const links: Link[] = await this.linkService.find({
            user,
            relations: ['orders']
        })

        return links.map(link => {

            const completedOrders: Order[] = link.orders.filter(o => o.complete)

            return {
                code: link.code,
                count: completedOrders.length,
                revenue: completedOrders.reduce((s, o) => s + o.ambassador_revenue, 0)
            }
        })
    }


    @Get('api/checkout/links/:code')
    async link(@Param('code') code: string) {
        return this.linkService.findOne({
            code,
            relations: ['user', 'products']
        })
    }

}
