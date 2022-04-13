import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    register(body: RegisterDto): Promise<any>;
}
