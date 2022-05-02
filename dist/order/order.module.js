"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const link_module_1 = require("../link/link.module");
const product_module_1 = require("../product/product.module");
const shared_module_1 = require("../shared/shared.module");
const order_1 = require("./order");
const order_item_1 = require("./order-item");
const order_item_service_1 = require("./order-item.service");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const nestjs_stripe_1 = require("nestjs-stripe");
const config_1 = require("@nestjs//config");
const order_listener_1 = require("./listeners/order.listener");
const mailer_1 = require("@nestjs-modules/mailer");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_1.Order, order_item_1.OrderItem]),
            shared_module_1.SharedModule,
            link_module_1.LinkModule,
            product_module_1.ProductModule,
            nestjs_stripe_1.StripeModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    apiKey: configService.get('STRIPE_KEY'),
                    apiVersion: '2020-08-27'
                })
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'docker.for.win.localhost',
                    port: 1025
                },
                defaults: {
                    from: 'no-reply@example.com'
                }
            })
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, order_item_service_1.OrderItemService, order_listener_1.OrderListener]
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map