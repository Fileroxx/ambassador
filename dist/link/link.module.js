"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const shared_module_1 = require("../shared/shared.module");
const link_1 = require("./link");
const link_controller_1 = require("./link.controller");
const link_service_1 = require("./link.service");
let LinkModule = class LinkModule {
};
LinkModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([link_1.Link]),
            shared_module_1.SharedModule,
            auth_module_1.AuthModule
        ],
        controllers: [link_controller_1.LinkController],
        providers: [link_service_1.LinkService],
        exports: [link_service_1.LinkService]
    })
], LinkModule);
exports.LinkModule = LinkModule;
//# sourceMappingURL=link.module.js.map