import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { Link } from './link';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link]),
  SharedModule,
  AuthModule
],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService]
})
export class LinkModule {}
