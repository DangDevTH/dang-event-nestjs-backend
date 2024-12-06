import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { TokenPayload } from 'google-auth-library';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { RoleType } from './auth/enums/role.enum';

@Controller()
@Roles(RoleType.USER)
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@CurrentUser() user: TokenPayload): string {
    console.log('User:', user);
    return this.appService.getHello();
  }

  @Get('/bye')
  getBye(): string {
    return 'bye';
  }
}
