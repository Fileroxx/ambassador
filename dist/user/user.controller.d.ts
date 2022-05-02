import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    ambassadors(): Promise<any[]>;
    rankings(): Promise<{
        name: any;
        revenue: any;
    }[]>;
}
