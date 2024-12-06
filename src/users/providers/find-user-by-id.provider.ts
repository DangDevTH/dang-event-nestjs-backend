import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindUserByIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    public async getUserById(id: string) :Promise<User>{
        let user = undefined;

        try {
          user = await this.usersRepository.findOne({
            where: { id: id},
            select: ['id', 'username', 'email', 'role'],
          });
        } catch (error) {
          throw new RequestTimeoutException(
            'Unable to process your request at the moment please try later',
            {
              description: 'Error connecting to the the datbase',
            },
          );
        }
    
        if (!user) {
          throw new BadRequestException('The user id does not exist');
        }
    
        return user;
    }
}
