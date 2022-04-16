import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async save(options) {
        return this.userRepository.save(options)
    }

    async findOne(options) {
        return this.userRepository.findOne(options);
    }

    async update(id: number, options) {
        return this.userRepository.update(id, options);
    }
}
