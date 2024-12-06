import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { promisify } from 'util';
import { createCipheriv, createDecipheriv, createHash, scrypt } from 'crypto';

@Injectable()
export class EncryptionProvider {
    private iv: Buffer;
    private password: Buffer;
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {
        this.iv = createHash('sha256')
            .update(this.jwtConfiguration.cryptoVI)
            .digest()
            .subarray(0, 16);

        this.password = createHash('sha256')
            .update(this.jwtConfiguration.cryptoPassword)
            .digest()
            .subarray(0, 32);
        
    }

    public async encrypt(data: string): Promise<string> {
        const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
        const cipher = await createCipheriv('aes-256-ctr', key, this.iv);
        const encryptedText = Buffer.concat([
        cipher.update(data),
        cipher.final(),
        ]);
        return encryptedText.toString('base64');
    }

    public async decrypt(encryptedDataBase64: string): Promise<string> {
        const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
        const decipher = await createDecipheriv('aes-256-ctr', key, this.iv);
        const decryptedText = Buffer.concat([
        decipher.update(Buffer.from(encryptedDataBase64, 'base64')),
        decipher.final(),
        ]);

        return decryptedText.toString();
    }
}
