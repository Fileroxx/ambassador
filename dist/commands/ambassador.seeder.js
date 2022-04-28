"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const faker = require("faker");
(async () => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(user_service_1.UserService);
    const password = await bcrypt.hash("1234", 12);
    for (let i = 0; i < 30; i++) {
        await userService.save({
            first_name: faker.br.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password,
            is_ambassador: true
        });
    }
    process.exit();
})();
//# sourceMappingURL=ambassador.seeder.js.map