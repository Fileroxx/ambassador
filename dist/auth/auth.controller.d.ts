import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterDto, request: Request): Promise<any>;
    login(email: string, password: string, response: Response, request: Request): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    updateInfo(request: Request, first_name: string, last_name: string, email: string): Promise<any>;
    updatePassword(request: Request, password: string, password_confirm: string): Promise<any>;
}
