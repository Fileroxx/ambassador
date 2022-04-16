import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterDto): Promise<any>;
    login(email: string, password: string, response: Response): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<import("../user/user").User>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    updateInfo(request: Request, first_name: string, last_name: string, email: string): Promise<import("../user/user").User>;
    updatePassword(request: Request, password: string, password_confirm: string): Promise<import("../user/user").User>;
}
