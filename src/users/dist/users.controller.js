"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UsersController = void 0;
var auth_service_1 = require("src/auth/providers/auth.service");
var common_1 = require("@nestjs/common");
var auth_decorator_1 = require("src/auth/decorators/auth.decorator");
var auth_type_enum_1 = require("src/auth/enums/auth-type.enum");
var UsersController = /** @class */ (function () {
    function UsersController(authService) {
        this.authService = authService;
    }
    UsersController.prototype.getUsers = function () {
        return this.authService.decrypt('MDZksPykGADOwPRtSDPYPiUbQp87FiftVd4iwgN4321v7qDe7z0UguyKjeoM/JdF2247M7bGCPq0KXc/tuDm8J+IwHx90k00CBKhveglaRowrcWgb9p0tmZ5ZHbPvLLOzo5zLjIKrdJcV2niZ2eIfwOhegyBru1t/V5Hm+3n7zCfDkGUq/n4YdhzNFqdpC5TjLEesYlhGInKXp6PDkDMffswABb2aBeHf/VhjPcNqihJGQnQAYKMEvkcP/n4li/Uc+yv5Bk3DpM36QVAlpBW7QbBRRgvp4xtumJB7hFCJlXY55OZSAhLivKpKnzPADtLjOij54ZP8zE1j7SauSG9UrjIbnBEguW/bm/X8OK/yJMLGjonNZJsKtjWc20Md8NDMlCrwg==');
    };
    __decorate([
        common_1.Get(),
        auth_decorator_1.Auth(auth_type_enum_1.AuthType.None)
    ], UsersController.prototype, "getUsers");
    UsersController = __decorate([
        common_1.Controller('usera'),
        __param(0, common_1.Inject(common_1.forwardRef(function () { return auth_service_1.AuthService; })))
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
