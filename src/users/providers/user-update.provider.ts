import { UploadsService } from './../../uploads/provider/uploads.service';
import { UploadUserImagesInputDto } from './../dto/upload-user-images.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  BadRequestException, forwardRef, Inject, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from '../dto/update-user.input';


@Injectable()
export class UserUpdateProvider {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @Inject(forwardRef(() => UploadsService))
        private readonly uploadsService: UploadsService,
    ) {}

    public async updateUser(email: string, updateUserInput: UpdateUserInput, { profileImage, backgroundImage }: UploadUserImagesInputDto) {
      let existingUser = undefined;
      let username = undefined;
      let uploadProfileImage = undefined;
      let uploadBackgroundImage = undefined;

      try {
        existingUser = await this.usersRepository.findOneBy({
          email: email,
        });
      } catch (error) {
        throw new RequestTimeoutException('Unable to process your request at the moment. Please try again later');
      }

      if(existingUser.email !== email) {
        throw new BadRequestException('Invalid user email!');
      }
      
      if(updateUserInput.username){
        try {
          username = await this.usersRepository.findOneBy({ username: updateUserInput.username });
        } catch(error){
          throw new RequestTimeoutException('Unable to process your request at the moment. Please try again later',
          );
        }
  
        if(username) {
          throw new BadRequestException('username already exists');
        }
      }


        if(profileImage && profileImage !== null){
          try {
            uploadProfileImage = await this.uploadsService.uploadFileUser(profileImage);
          } catch (error) {
            throw new RequestTimeoutException(
              'Unable to process your request at the moment. Please try again later1',
            );
          }
        }

        if(backgroundImage && backgroundImage !== null){
          try {
            uploadBackgroundImage = await this.uploadsService.uploadFileUser(backgroundImage);
          } catch (error) {
            throw new RequestTimeoutException(
              'Unable to process your request at the moment. Please try again later1',
            );
          }
        }
      

      existingUser.username = updateUserInput.username ?? existingUser.username;
      existingUser.name = updateUserInput.name ?? existingUser.name;
      existingUser.profileImage = uploadProfileImage ?? existingUser.profileImage;
      existingUser.backgroundImage = uploadBackgroundImage ?? existingUser.backgroundImage;

      try {
        await this.usersRepository.save(existingUser);
        
      }catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment. Please try again later',
        );
      }
      return existingUser;
    }
}
