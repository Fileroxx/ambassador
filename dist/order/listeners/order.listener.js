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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const redis_service_1 = require("../../shared/redis.service");
const order_1 = require("../order");
const mailer_1 = require("@nestjs-modules/mailer");
let OrderListener = class OrderListener {
    constructor(redisService, mailerService) {
        this.redisService = redisService;
        this.mailerService = mailerService;
    }
    async handleOrderCompletedEvent(order) {
        const client = this.redisService.getClient();
        client.zincrby('ranking', order.ambassador_revenue, order.user.name);
        await this.mailerService.sendMail({
            to: 'admin@admin.com',
            subject: 'An order has been completed',
            html: `Order ${order.id} with a total de ${order.total} has been completed!`
        });
        await this.mailerService.sendMail({
            to: order.ambassador_email,
            subject: 'An order has been completed',
            html: `You earned ${order.ambassador_revenue} with a total de ${order.total} from the link #${order.code}`
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('order.completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_1.Order]),
    __metadata("design:returntype", Promise)
], OrderListener.prototype, "handleOrderCompletedEvent", null);
OrderListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        mailer_1.MailerService])
], OrderListener);
exports.OrderListener = OrderListener;
//# sourceMappingURL=order.listener.js.map