import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByUsernameProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async getByUsername(username: string): Promise<User> {
    let existingUser = undefined;
    try {
      existingUser = await this.usersRepository.findOneBy({
        username: username,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later',
      );
    }

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return existingUser;
  }
}
