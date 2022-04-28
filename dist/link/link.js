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
exports.Link = void 0;
const user_1 = require("../user/user");
const product_1 = require("../product/product");
const typeorm_1 = require("typeorm");
const order_1 = require("../order/order");
let Link = class Link {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Link.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Link.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_1.User)
], Link.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_1.Product),
    (0, typeorm_1.JoinTable)({
        name: 'link_products',
        joinColumn: { name: 'link_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], Link.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_1.Order, order => order.link, {
        createForeignKeyConstraints: false
    }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'code',
        name: 'code'
    }),
    __metadata("design:type", Array)
], Link.prototype, "orders", void 0);
Link = __decorate([
    (0, typeorm_1.Entity)()
], Link);
exports.Link = Link;
//# sourceMappingURL=link.js.map