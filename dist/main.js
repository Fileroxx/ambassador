"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: ['http://localhost:4200', 'http://localhost:4300', 'http://localhost:5000'],
        credentials: true
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map