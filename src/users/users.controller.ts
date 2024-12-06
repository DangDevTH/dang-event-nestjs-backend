import { AuthService } from 'src/auth/providers/auth.service';
import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('usera')
export class UsersController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ){}

    @Get()
    @Auth(AuthType.None)
    public getUsers() {
        return this.authService.decrypt('MDZksPykGADOwPRtSDPYPiUbQp87FiftVd4iwgN4321v7qDe7z0UguyKjeoM/JdF2247M7bGCPq0KXc/tuDm8J+IwHx90k00CBKhveglaRowrcWgb9p0tmZ5ZHbPvLLOzo5zLjIKrdJcV2niZ2eIfwOhegyBru1t/V5Hm+3n7zCfDkGUq/n4YdhzNFqdpC5TjLEesYlhGInKXp6PDkDMffswABb2aBeHf/VhjPcNqihJGQnQAYKMEvkcP/n4li/Uc+yv5Bk3DpM36QVAlpBW7QbBRRgvp4xtumJB7hFCJlXY55OZSAhLivKpKnzPADtLjOij54ZP8zE1j7SauSG9UrjIbnBEguW/bm/X8OK/yJMLGjonNZJsKtjWc20Md8NDMlCrwg==');
    }
}
