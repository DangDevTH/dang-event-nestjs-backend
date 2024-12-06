import { Auth } from 'src/auth/decorators/auth.decorator';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Response } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';

@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    constructor(
        private readonly googleAuthenticationService: GoogleAuthenticationService,
    ) {}

    @Post()
    @Auth(AuthType.None)
    public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
        return this.googleAuthenticationService.googleAuthenticate(googleTokenDto);
    }

    @Post('logout')
    public logout(@CurrentUser() user: TokenPayload) {
        return this.googleAuthenticationService.logout(user);
    }
}
