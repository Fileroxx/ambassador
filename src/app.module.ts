import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LinkModule } from './link/link.module';
import { SharedModule } from './shared/shared.module';


@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ambassador',
      autoLoadEntities: true,
      synchronize: true,
    }),
  
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    LinkModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
