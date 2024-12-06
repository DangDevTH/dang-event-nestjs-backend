import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostProvider } from './providers/create-post.provider';
import { UsersModule } from 'src/users/users.module';
import { SearchPostInPageProvider } from './providers/search-post-in-page.provider';
import { FindPostByIdProvider } from './providers/find-post-by-id.provider';
import { PostsService } from './providers/posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [UsersModule ,TypeOrmModule.forFeature([Post])],
  providers: [PostsResolver, PostsService, CreatePostProvider, SearchPostInPageProvider, FindPostByIdProvider],
  controllers: [PostsController],
})
export class PostsModule {}
