import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID) 
  id: string;
}
