import { GoogleUser } from './../interfaces/google-user.interface';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserCreateProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    public async createUser(googleUser: GoogleUser) {
      try {
        const user = this.usersRepository.create(googleUser);
        return await this.usersRepository.save(user);
      } catch (error) {
          throw new ConflictException(error, {
              description: 'Could not create a new user',
          });
      }
    }
}
