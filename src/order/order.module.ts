import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from 'src/link/link.module';
import { ProductModule } from 'src/product/product.module';
import { SharedModule } from 'src/shared/shared.module';
import { Order } from './order';
import { OrderItem } from './order-item';
import { OrderItemService } from './order-item.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {StripeModule} from 'nestjs-stripe';
import {ConfigService} from '@nestjs//config'
import { OrderListener } from './listeners/order.listener';
import {MailerModule} from '@nestjs-modules/mailer'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    SharedModule,
    LinkModule,
    ProductModule,
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_KEY'),
        apiVersion: '2020-08-27'
      })
    }),
    MailerModule.forRoot({
      transport: {
        host: 'docker.for.win.localhost',
        port: 1025
      },
      defaults: {
        from: 'no-reply@example.com'
      }
    })
  ],
  controllers: [OrderController],

  providers: [OrderService, OrderItemService, OrderListener]
})
export class OrderModule {}
