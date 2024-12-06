import { EncryptionProvider } from './encryption.provider';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProvider {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly encryptionProvider: EncryptionProvider,
    ) {}

    public async signToken<T>(userId: string, expiresIn: number, playload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...playload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            },
        );
    }

    public async generateTokens(user: User) {
        let accessToken: string;
        const [jwtToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, {
                email: user.email,
            },),
        ]);
        try {
            accessToken = await this.encryptionProvider.encrypt(jwtToken);
        } catch (error) {
            throw new Error('Could not encrypt JWT token');
        }

        return { accessToken };
    }
}
