import { PaginationArgsDto } from '../dto/pagination-args.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostType } from '../interfaces/post-type.interface';


@Injectable()
export class SearchPostInPageProvider {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    public async searchPosts({ username, limit, skip }: PaginationArgsDto): Promise<PostType[]> {
        const posts = await this.postRepository.createQueryBuilder('post')
          .leftJoinAndSelect('post.author', 'user')
          .where('user.username = :username', { username })
          .orderBy('post.createDate', 'DESC')
          .skip(skip)
          .take(limit)
          .select([
            'post.id',
            'post.content',
            'post.featuredImageUrl',
            'post.status',
            'post.createDate',
            'user.id',
            'user.name',
            'user.username',
          ])
          .getMany();
      
        return posts;
    }
}
