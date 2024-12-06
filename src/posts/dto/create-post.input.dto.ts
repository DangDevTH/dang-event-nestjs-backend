import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { postStatusType } from '../enums/postStatus.enum';

@InputType()
export class CreatePostInputDto extends AbstractEntity {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @Field()
  content?: string;

  @IsEmpty()
  @IsString()
  @MaxLength(1024)
  @IsOptional()
  @Field({ nullable: true })
  featuredImageUrl?: string;

  @IsEnum(postStatusType)
  @IsEmpty()
  @IsOptional()
  @Field(() => postStatusType, { nullable: true })
  status?: postStatusType;
}
