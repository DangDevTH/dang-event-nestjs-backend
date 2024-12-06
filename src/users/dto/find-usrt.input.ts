import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

@InputType('FindUserInput')
export class FindUserInput  {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @Field()
  username: string;
}
