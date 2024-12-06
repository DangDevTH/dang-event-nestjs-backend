import { ConfigService } from '@nestjs/config';
import { UploadsProvider } from './uploads.provider';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as Upload from 'graphql-upload/public/Upload.js';

@Injectable()
export class UploadsService {
    constructor(
        private readonly uploadsProvider: UploadsProvider,
        private readonly configService: ConfigService,
    ) {}

    public async uploadFileUser(file: Upload) {
          const resolvedFile = await file; 
          if (!['image/jpg', 'image/jpeg', 'image/png'].includes(resolvedFile.mimetype.toLowerCase())) {
            throw new BadRequestException('Mime type not supported');
          }
          
          try {
            const name = await this.uploadsProvider.fileUpload(resolvedFile);
            const urlImage: string = `${this.configService.get<string>('appConfig.awsCloudfrontUrl')}/${name}`
            // console.log('urlImage', urlImage)
            return urlImage;
          } catch (error) {
            throw new ConflictException(error);
          }
        
    }

}   
