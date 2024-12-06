import { EncryptionProvider } from './encryption.provider';
import { CurrentUserPayload, CurrentUserRolePayload } from '../interfaces/current-user-payload.interface';
import { UsersService } from './../../users/providers/users.service';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        private readonly encryptionProvider: EncryptionProvider,
    ) {}

    public async validateJwtUser(id: string) {
        const user = await this.usersService.findById(id);
        if(!user) throw new UnauthorizedException("User not found!");
        const currentUser: CurrentUserPayload = { id: user.id ,email: user.email};
        return currentUser;
    }

    public async validateRoleUser(id: string) {
        const user = await this.usersService.findById(id);
        if(!user) throw new UnauthorizedException("User not found!");
        const currentUser: CurrentUserRolePayload = { id: user.id ,email: user.email, role: user.role };
        return currentUser;
    }

    public async encrypt(data: string): Promise<string> {
        return await this.encryptionProvider.encrypt(data);
    }

    public async decrypt(encryptedData: string): Promise<string> {
        return await this.encryptionProvider.decrypt(encryptedData);
    }
}
