import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class FindPostByIdProvider {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}

    public async findById(id: string): Promise<Post> {
        let post = undefined;
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid post ID');
        }

        try {
            post = await this.postsRepository.findOneBy({ id });

        } catch (error) {
            throw new ConflictException(error);
        }

        if (!post) {
            throw new BadRequestException('The user id does not exist');
        }
      
        return post;

    }
}
