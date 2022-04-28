import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt"
import { SharedModule } from 'src/shared/shared.module';
@Module({
  imports: [
    UserModule,
    SharedModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
