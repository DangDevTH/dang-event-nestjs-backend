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
exports.GoogleAuthenticationController = void 0;
var auth_decorator_1 = require("src/auth/decorators/auth.decorator");
var common_1 = require("@nestjs/common");
var auth_type_enum_1 = require("src/auth/enums/auth-type.enum");
var current_user_decorator_1 = require("src/auth/decorators/current-user.decorator");
var GoogleAuthenticationController = /** @class */ (function () {
    function GoogleAuthenticationController(googleAuthenticationService) {
        this.googleAuthenticationService = googleAuthenticationService;
    }
    GoogleAuthenticationController.prototype.authenticate = function (googleTokenDto) {
        return this.googleAuthenticationService.googleAuthenticate(googleTokenDto);
    };
    GoogleAuthenticationController.prototype.logout = function (user) {
        return this.googleAuthenticationService.logout(user);
    };
    __decorate([
        common_1.Post(),
        auth_decorator_1.Auth(auth_type_enum_1.AuthType.None),
        __param(0, common_1.Body())
    ], GoogleAuthenticationController.prototype, "authenticate");
    __decorate([
        common_1.Post('logout'),
        __param(0, current_user_decorator_1.CurrentUser())
    ], GoogleAuthenticationController.prototype, "logout");
    GoogleAuthenticationController = __decorate([
        common_1.Controller('auth/google-authentication')
    ], GoogleAuthenticationController);
    return GoogleAuthenticationController;
}());
exports.GoogleAuthenticationController = GoogleAuthenticationController;
