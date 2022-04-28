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
exports.Order = void 0;
const class_transformer_1 = require("class-transformer");
const link_1 = require("../link/link");
const user_1 = require("../user/user");
const typeorm_1 = require("typeorm");
const order_item_1 = require("./order-item");
let Order = class Order {
    get name() {
        return `${this.first_name} ${this.last_name}`;
    }
    get total() {
        return this.order_items.reduce((s, i) => s + i.admin_revenue, 0);
    }
    get ambassador_revenue() {
        return this.order_items.reduce((s, i) => s + i.ambassador_revenue, 0);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Order.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "ambassador_email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "zip", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "complete", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_1.OrderItem, orderItem => orderItem.order),
    __metadata("design:type", Array)
], Order.prototype, "order_items", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => link_1.Link, link => link.orders, {
        createForeignKeyConstraints: false
    }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'code',
        name: 'code'
    }),
    __metadata("design:type", link_1.Link)
], Order.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.orders, {
        createForeignKeyConstraints: false
    }),
    __metadata("design:type", user_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Order.prototype, "name", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Order.prototype, "total", null);
Order = __decorate([
    (0, typeorm_1.Entity)('orders')
], Order);
exports.Order = Order;
//# sourceMappingURL=order.js.map