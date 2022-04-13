import { Repository } from 'typeorm';
import { User } from './user';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    save(options: any): Promise<any>;
}
