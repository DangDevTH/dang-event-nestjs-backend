import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class PaginationArgsDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;


  @IsNotEmpty()
  @Min(0)
  @IsOptional()
  @Field(() => Int, { nullable: true})
  limit?: number = 10;

  @IsNotEmpty()
  @Min(0)
  @IsOptional()
  @Field(() => Int, { nullable: true})
  skip?: number = 0;
}
