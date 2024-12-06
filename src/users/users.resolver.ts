import { Resolver, Query, Mutation, Args, Int, ID, Context } from '@nestjs/graphql';
import { UsersService } from './providers/users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Req, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleType } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Request } from 'express';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-usrt.input';
import { CurrentUserPayload } from 'src/auth/interfaces/current-user-payload.interface';
import { UploadUserImagesInputDto } from './dto/upload-user-images.input.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], { name: 'users' })
  @Auth(AuthType.Bearer)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'me' })
  findOne(@CurrentUser() user: CurrentUserPayload) {
    console.log('user', user)
    return this.usersService.findById(user.id);
  }

  @Query(() => User, { name: 'username' })
  findOneByUsername(@Args('FindUserInput') findUserInput: FindUserInput) {
    console.log('findOneByUsername', findUserInput);
    return this.usersService.findOneByUsername(findUserInput.username);
  }

  @Mutation(() => User)
  updateUser(@CurrentUser() user: CurrentUserPayload ,
  @Args('updateUserInput') updateUserInput: UpdateUserInput, 
  @Args('uploadUserImagesInputDto') uploadUserImagesInputDto: UploadUserImagesInputDto ){
    return this.usersService.update(user.email, updateUserInput , uploadUserImagesInputDto);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return 0;
  }
}
