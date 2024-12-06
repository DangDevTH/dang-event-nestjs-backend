import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { postStatusType } from '../enums/postStatus.enum';

@Entity()
@ObjectType()
export class Post extends AbstractEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  content: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  @Field({ nullable: true })
  featuredImageUrl?: string;

  @Column({
    type: "enum",
    enum: postStatusType,
    default: postStatusType.PUBLISHED,
  })
  @Field(() => postStatusType, { nullable: true })
  status: postStatusType;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @Field(() => User)
  author: User;

  @CreateDateColumn()
  @Field(() => Date)
  createDate: Date;
}
