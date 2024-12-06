import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { UserStatusType } from '../enums/user-status.enum';
import { RoleType } from 'src/auth/enums/role.enum';
import { Post } from 'src/posts/entities/post.entity';
import { IsOptional } from 'class-validator';


@Entity()
@ObjectType()
export class User extends AbstractEntity {
  @Column({
    type: "varchar",
    length: 60,
  })
  @Field()
  name: string;

  @Column({
    type: "varchar",
    length: 60,
    unique: true,
  })
  @Field()
  username: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  @IsOptional()
  @Field({ nullable : true })
  profileImage?: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  @IsOptional()
  @Field({ nullable : true })
  backgroundImage?: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  @Field()
  @Exclude()
  email: string;

  @Column({
      type: "varchar",
      nullable: true,
      unique: true,
  })
  @Field({ nullable: true }) 
  @Exclude()
  googleId?: string;

  @Column({
    type: "enum",
    enum: UserStatusType,
    default: UserStatusType.ACTIVE,
  })
  @Field(() => UserStatusType, { nullable: true })
  @Exclude()
  status: UserStatusType;

  @Column({
    type: "enum",
    enum: RoleType,
    default: RoleType.USER,
  })
  @Field(() => RoleType, { nullable: true })
  @Exclude()
  role: RoleType;

  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post])
  posts: Post[];

  @CreateDateColumn()
  @Field(() => Date)
  createDate: Date;
  
  @UpdateDateColumn()
  @Field(() => Date)
  updateDate: Date;
}
