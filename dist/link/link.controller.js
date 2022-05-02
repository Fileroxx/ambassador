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
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const auth_service_1 = require("../auth/auth.service");
const link_service_1 = require("./link.service");
let LinkController = class LinkController {
    constructor(linkService, authService) {
        this.linkService = linkService;
        this.authService = authService;
    }
    async all(id) {
        return this.linkService.find({
            user: id,
            where: { id },
            relations: ['orders', 'orders.order_items']
        });
    }
    async create(products, request) {
        const user = await this.authService.user(request);
        return this.linkService.save({
            code: Math.random().toString(36).substr(6),
            user,
            products: products.map(id => ({ id }))
        });
    }
    async stats(request) {
        const user = await this.authService.user(request);
        const links = await this.linkService.find({
            user,
            relations: ['orders']
        });
        return links.map(link => {
            const completedOrders = link.orders.filter(o => o.complete);
            return {
                code: link.code,
                count: completedOrders.length,
                revenue: completedOrders.reduce((s, o) => s + o.ambassador_revenue, 0)
            };
        });
    }
    async link(code) {
        return this.linkService.findOne({
            code,
            relations: ['user', 'products']
        });
    }
};
__decorate([
    (0, common_1.Get)('api/admin/users/:id/links'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('api/ambassador/links'),
    __param(0, (0, common_1.Body)('products')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('api/ambassador/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)('api/checkout/links/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "link", null);
LinkController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [link_service_1.LinkService,
        auth_service_1.AuthService])
], LinkController);
exports.LinkController = LinkController;
//# sourceMappingURL=link.controller.js.map