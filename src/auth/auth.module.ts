import { forwardRef, Module } from '@nestjs/common';
import { GoogleAuthenticationService } from './social/google-authentication/providers/google-authentication.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthenticationController } from './social/google-authentication/google-authentication.controller';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './providers/auth.service';
import { EncryptionProvider } from './providers/encryption.provider';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [GoogleAuthenticationService, GenerateTokensProvider, JwtStrategy, AuthService, EncryptionProvider],
  exports: [AuthService],
  controllers: [GoogleAuthenticationController],
})
export class AuthModule {}
