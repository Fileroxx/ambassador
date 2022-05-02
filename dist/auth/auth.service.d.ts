import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    user(request: Request): Promise<any>;
}
