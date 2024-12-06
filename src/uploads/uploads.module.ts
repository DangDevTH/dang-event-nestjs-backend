import { forwardRef, Module } from '@nestjs/common';
import { UploadsService } from './provider/uploads.service';
import { UploadsProvider } from './provider/uploads.provider';
import { UsersModule } from 'src/users/users.module';



@Module({
  imports: [forwardRef(() => UsersModule),],
  providers: [UploadsService, UploadsProvider],
  exports: [UploadsService]
})
export class UploadsModule {}
