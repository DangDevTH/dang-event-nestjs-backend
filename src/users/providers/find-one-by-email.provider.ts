import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByEmailProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    public async findOneByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email,
            },
            select: ['id', 'username', 'name', 'profileImage', 'backgroundImage'],
        });
    }
}
