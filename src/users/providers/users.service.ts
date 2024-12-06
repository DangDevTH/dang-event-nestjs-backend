import { UploadUserImagesInputDto } from './../dto/upload-user-images.input.dto';
import { FindUserByIdProvider } from './find-user-by-id.provider';
import { FindUserInput } from './../dto/find-usrt.input';
import { GoogleUser } from './../interfaces/google-user.interface';
import { FindOneByUsernameProvider } from './find-one-by-username.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { UserCreateProvider } from './user-create.provider';
import { BadRequestException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { UpdateUserInput } from '../dto/update-user.input';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateProvider } from './user-update.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly userCreateProvider: UserCreateProvider,
    private readonly userUpdateProvider: UserUpdateProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    private readonly findOneByUsernameProvider: FindOneByUsernameProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
    private readonly findUserByIdProvider: FindUserByIdProvider,
  ){}

  public async create(googleUser: GoogleUser) {
    return await this.userCreateProvider.createUser(googleUser);
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  public async findById(id: string) {
    return await this.findUserByIdProvider.getUserById(id);
  }

  public async update(email: string, updateUserInput: UpdateUserInput, uploadUserImagesInputDto: UploadUserImagesInputDto) {
    return await this.userUpdateProvider.updateUser(email, updateUserInput, uploadUserImagesInputDto);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async findOneByUsername(username: string) {
    return await this.findOneByUsernameProvider.getByUsername(username);
  }

  public async findOneByEmail(email: string) {
    // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    // await sleep(1000);
    return await this.findOneByEmailProvider.findOneByEmail(email);
  }

}
