import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserUpdateProvider } from './providers/user-update.provider';
import { UserCreateProvider } from './providers/user-create.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { FindOneByUsernameProvider } from './providers/find-one-by-username.provider';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { FindUserByIdProvider } from './providers/find-user-by-id.provider';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), forwardRef(() => UploadsModule)],
  providers: [
    UsersResolver,
    UsersService,
    UserUpdateProvider,
    UserCreateProvider,
    FindOneByGoogleIdProvider,
    FindOneByUsernameProvider,
    FindOneByEmailProvider,
    FindUserByIdProvider,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
