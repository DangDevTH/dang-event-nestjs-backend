import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { CreatePostInputDto } from '../dto/create-post.input.dto';
import { UsersService } from 'src/users/providers/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreatePostProvider {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}
    public async createPost(id: string, createPostInputDto: CreatePostInputDto) {
        let author = undefined;

        try {
            author = await this.usersService.findById(id);

        } catch (error) {
            throw new ConflictException(error);
        }
    
        let post = this.postsRepository.create({
          ...createPostInputDto,
          author: author,
        });
    
        try {
            return await this.postsRepository.save(post);
        } catch (error) {
            throw new ConflictException(String(error),{
                description: 'Ensure post slug is unique and not a duplicate',
            });
        }
    }
}
