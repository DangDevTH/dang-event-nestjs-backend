import { PaginationArgsDto } from '../dto/pagination-args.dto';
import { CreatePostProvider } from './create-post.provider';
import { CreatePostInputDto } from './../dto/create-post.input.dto';
import { UpdatePostInputDto } from './../dto/update-post.input.dto';
import { SearchPostInPageProvider } from './search-post-in-page.provider';
import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostType } from '../interfaces/post-type.interface';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

    private readonly createPostProvider: CreatePostProvider,
    private readonly searchPostInPageProvider: SearchPostInPageProvider,
  ) {}
  public async create( id: string, createPostInputDto: CreatePostInputDto) {
    return await this.createPostProvider.createPost(id, createPostInputDto);
  }

  public async searchPostInPage(paginationArgsDto: PaginationArgsDto): Promise<PostType[]> {
    return this.searchPostInPageProvider.searchPosts(paginationArgsDto)
  }

  findAll() {
    return `This action returns all posts`;
  }

  async countPosts(username: string): Promise<number> {
    try {
      const count = await this.postsRepository.countBy({
        author: { username },
      });
        return count;
  
    } catch (error) {
      console.error("Error counting posts:", error);
      throw new Error("Could not count posts");
    }
  }
  

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: string, updatePostInputDto: UpdatePostInputDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
