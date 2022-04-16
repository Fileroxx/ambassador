import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

constructor(
    private userService: UserService,
    private jwtService: JwtService
) {
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

}


@Post('api/admin/login')
async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
) {
    const user = await this.userService.findOne({email});

    if(!user) {
        throw new NotFoundException('User not found')
    }

    if(!await bcrypt.compare(password, user.password)) {
        throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
        id: user.id
    });

    response.cookie('jwt', jwt, {httpOnly: true});

    return {
        message: 'success'
    };

}

@UseGuards(AuthGuard)
@Get('api/admin/user')
async user(@Req() request: Request) {
    const cookie = request.cookies['jwt']

    const {id} = await this.jwtService.verifyAsync(cookie);

    return this.userService.findOne({id});
}

@UseGuards(AuthGuard)
@Post('api/admin/logout')
async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {
        message: 'success'
    }
}

@UseGuards(AuthGuard)
@Put('api/admin/users/info')
async updateInfo(
    @Req() request: Request,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
) {
    const cookie = request.cookies['jwt']

    const {id} = await this.jwtService.verifyAsync(cookie);

    await this.userService.update(id, {
        first_name,
        last_name,
        email
    })

    return this.userService.findOne({id});
}

@Put('api/admin/users/password')
async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,   
    @Body('password_confirm') password_confirm: string,

)   
 {

    if (password !== password_confirm){
        throw new BadRequestException('Passwords do not match!')
    } 

const cookie = request.cookies['jwt']

const {id} = await this.jwtService.verifyAsync(cookie);

await this.userService.update(id, {
    password: await bcrypt.hash(password, 12)
})

return this.userService.findOne({id});


    }
}
