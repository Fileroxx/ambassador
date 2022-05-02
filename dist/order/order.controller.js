"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const common_5 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const link_service_1 = require("../link/link.service");
const product_service_1 = require("../product/product.service");
const typeorm_1 = require("typeorm");
const create_order_dto_1 = require("./dtos/create-order.dto");
const order_1 = require("./order");
const order_item_1 = require("./order-item");
const order_item_service_1 = require("./order-item.service");
const order_service_1 = require("./order.service");
const nestjs_stripe_1 = require("nestjs-stripe");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
let OrderController = class OrderController {
    constructor(orderService, orderItemService, linkService, productService, connection, stripeClient, configService, eventEmitter) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
        this.linkService = linkService;
        this.productService = productService;
        this.connection = connection;
        this.stripeClient = stripeClient;
        this.configService = configService;
        this.eventEmitter = eventEmitter;
    }
    all() {
        return this.orderService.find({
            relations: ['order_items']
        });
    }
    async create(body) {
        const link = await this.linkService.findOne({
            code: body.code,
            relations: ['user']
        });
        if (!link) {
            throw new common_4.BadRequestException('Invalid link!');
        }
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const o = new order_1.Order();
            o.user_id = link.user.id;
            o.ambassador_email = link.user.email;
            o.first_name = body.first_name;
            o.last_name = body.last_name;
            o.email = body.email;
            o.address = body.address;
            o.country = body.country;
            o.city = body.city;
            o.zip = body.zip;
            o.code = body.code;
            const order = await queryRunner.manager.save(o);
            const line_items = [];
            for (let p of body.products) {
                const product = await this.productService.findOne({
                    id: p.product_id
                });
                const orderItem = new order_item_1.OrderItem();
                orderItem.order = order;
                orderItem.product_title = product.title;
                orderItem.price = product.price;
                orderItem.quantity = p.quantity;
                orderItem.ambassador_revenue = 0.1 * product.price * p.quantity;
                orderItem.admin_revenue = 0.9 * product.price * p.quantity;
                await queryRunner.manager.save(orderItem);
                line_items.push({
                    name: product.title,
                    description: product.description,
                    images: [
                        product.image
                    ],
                    amount: 100 * product.price,
                    currency: 'usd',
                    quantity: p.quantity
                });
            }
            const source = await this.stripeClient.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                success_url: `${this.configService.get('CHECKOUT_URL')}/success?source={CHECKOUT_SESSION_ID}`,
                cancel_url: `${this.configService.get('CHECKOUT_URL')}/error`
            });
            order.transaction_id = source['id'];
            await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();
            return source;
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            throw new common_4.BadRequestException('BAD REQUEST FI');
        }
        finally {
            await queryRunner.release();
        }
    }
    async confirm(source) {
        const order = await this.orderService.findOne({
            where: { transation_id: source },
            relations: ['order_items']
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        await this.orderService.update(order.id, {
            complete: true
        });
        await this.eventEmitter.emit('order.completed', order);
        return {
            message: 'success'
        };
    }
};
__decorate([
    (0, common_3.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_5.UseInterceptors)(common_5.ClassSerializerInterceptor),
    (0, common_5.Get)('api/admin/orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('api/checkout/orders'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('api/checkout/orders/confirm'),
    __param(0, (0, common_2.Body)('source')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "confirm", null);
OrderController = __decorate([
    (0, common_5.Controller)(),
    __param(5, (0, nestjs_stripe_1.InjectStripe)()),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        order_item_service_1.OrderItemService,
        link_service_1.LinkService,
        product_service_1.ProductService,
        typeorm_1.Connection,
        stripe_1.default,
        config_1.ConfigService,
        event_emitter_1.EventEmitter2])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map