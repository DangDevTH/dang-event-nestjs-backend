import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@InputType('UserInput')
export class CreateUserInput extends AbstractEntity {
  @IsString()
  @MaxLength(60)
  @IsOptional()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username can only contain letters and numbers',
  })
  @Field({ nullable: true })
  name?: string | null;

  @IsString()
  @MaxLength(60)
  @IsOptional()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username can only contain letters and numbers',
  })
  @Field({ nullable: true })
  username?: string | null;
}
