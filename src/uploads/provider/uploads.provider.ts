import { ConfigService } from '@nestjs/config';
import { Injectable, RequestTimeoutException, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import { S3 } from 'aws-sdk';
import { v4 as uuid4 } from 'uuid';
import * as Upload from 'graphql-upload/public/Upload.js';

@Injectable()
export class UploadsProvider {

    constructor(private readonly configService: ConfigService) {}

    public async fileUpload(file: Upload) {
        try {
            const resolvedFile = await file;
            const { createReadStream, filename, mimetype } = resolvedFile;
            const stream = createReadStream();

            const s3 = new S3();
            const uploadResult = await s3.upload({
                Bucket: this.configService.get('appConfig.awsBucketName'),
                Body: stream,
                Key: this.generateFileName(filename),
                ContentType: mimetype,
            }).promise();

            return uploadResult.Key;
        } catch (error) {
            console.error('File upload error:', error);
            throw new RequestTimeoutException(error.message || 'Failed to upload file to S3');
        }
    }

    private generateFileName(file: string) {
        let name = file.split('.')[0];
        name = name.replace(/\s+/g, ''); 
        let extension = path.extname(file);
        let timestamp = new Date().getTime().toString().trim();

        return `${name}-${timestamp}-${uuid4()}${extension}`;
    }
}
