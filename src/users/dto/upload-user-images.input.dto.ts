import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/public/GraphQLUpload.js';
import * as Upload from 'graphql-upload/public/Upload.js';
import { IsOptional } from 'class-validator';

@InputType()
export class UploadUserImagesInputDto {
    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })  
    profileImage?: Upload | null; 
  
    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true }) 
    backgroundImage?: Upload | null;  
}
