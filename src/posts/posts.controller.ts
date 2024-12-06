import { PostsService } from './providers/posts.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ){}
    @Get('count/:username')
    async countPosts(@Param('username') username: string): Promise<number> {
      return this.postsService.countPosts(username);
    }
}
