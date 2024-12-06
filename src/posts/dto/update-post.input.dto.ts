import { CreatePostInputDto } from './create-post.input.dto';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePostInputDto extends PartialType(CreatePostInputDto) {
}
