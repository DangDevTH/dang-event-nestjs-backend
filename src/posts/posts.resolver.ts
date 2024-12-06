import { PostsService } from './providers/posts.service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { PaginationArgsDto } from './dto/pagination-args.dto';
import { CurrentUserPayload } from 'src/auth/interfaces/current-user-payload.interface';
import { PostType } from './interfaces/post-type.interface';

@Resolver(() => Post)
export class PostsResolver {

  constructor(private readonly postsService: PostsService) {}

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @Mutation(() => Post)
  async createPost(@CurrentUser() user: CurrentUserPayload ,@Args('createPostInputDto') createPostInputDto: CreatePostInputDto): Promise<Post> {
    // await this.sleep(1000);
    return this.postsService.create(user.id, createPostInputDto);
  }

  // @Query(() => [Post], { name: 'postsxx' })
  // async findAll() {
  //   return this.postsService.findAll();
  // }
  
  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post], { name: 'posts' })
  async searchPostInPage(@Args('PaginationArgsDto') paginationArgsDto: PaginationArgsDto): Promise<PostType[]> {
    // await this.sleep(1000);
    return this.postsService.searchPostInPage(paginationArgsDto);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInputDto: UpdatePostInputDto) {
    return this.postsService.update(updatePostInputDto.id, updatePostInputDto);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}
