import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {

constructor(private userService: UserService) {
}

@Post('api/admin/register')
async register(@Body() body: RegisterDto) {

    const {password_confirm, ...data} = body;

    if (body.password !== password_confirm){
        throw new BadRequestException('Passwords do not match!')
    } 

    const hashed = await bcrypt.hash(body.password, 12)

    return this.userService.save({
        ...data,
        password: hashed,
        is_ambassador: false
    });

    return body;
}

}
