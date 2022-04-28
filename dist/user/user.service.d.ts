import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { User } from './user';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
}
