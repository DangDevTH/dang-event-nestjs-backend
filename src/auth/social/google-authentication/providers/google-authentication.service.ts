import { GenerateTokensProvider } from './../../../providers/generate-tokens.provider';
import { UsersService } from './../../../../users/providers/users.service';
import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../../dto/google-token.dto';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';

@Injectable()
export class GoogleAuthenticationService {
    private oauthClient: OAuth2Client;

    constructor(

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        private readonly generateTokensProvider: GenerateTokensProvider,
    ){}

    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;

        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    public async googleAuthenticate(googleTokenDto: GoogleTokenDto) {
        try {
            const loginTicket = await this.oauthClient.verifyIdToken({
                idToken: googleTokenDto.token,
            });
            console.log(loginTicket);
            const { email, sub: googleId, name } = loginTicket.getPayload();
            
            const userGoogleId = await this.usersService.findOneByGoogleId(googleId);

            if(userGoogleId){
                return this.generateTokensProvider.generateTokens(userGoogleId);
            }

            const randomNumber: number = Math.floor(Math.random() * 1000);
            const timestamp: number = Date.now() + randomNumber;
            const usermail: string = email.split('@')[0];
            const cleanUsermail: string = usermail.replace(/[^A-Za-z0-9]/g, '');
            const username: string = `${cleanUsermail}${timestamp}`;

            const newUser = await this.usersService.create({
                email: email,
                name: name,
                username: username,
                googleId: googleId,
            });

            return this.generateTokensProvider.generateTokens(newUser);
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    public async logout(user: TokenPayload) {
        try {
            const email = await this.usersService.findOneByEmail(user.email);
            if(!email) throw new BadRequestException();

            return { accessToken: '' };
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
