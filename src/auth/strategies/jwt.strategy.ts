import { AuthService } from './../providers/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenPayload } from '../interfaces/token-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  validate(payload: TokenPayload) {
    console.log('validate',payload);
    try {
      return this.authService.validateJwtUser(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
