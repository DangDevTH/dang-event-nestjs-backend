"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var google_authentication_service_1 = require("./social/google-authentication/providers/google-authentication.service");
var users_module_1 = require("src/users/users.module");
var config_1 = require("@nestjs/config");
var google_authentication_controller_1 = require("./social/google-authentication/google-authentication.controller");
var generate_tokens_provider_1 = require("./providers/generate-tokens.provider");
var jwt_config_1 = require("./config/jwt.config");
var jwt_1 = require("@nestjs/jwt");
var jwt_strategy_1 = require("./strategies/jwt.strategy");
var auth_service_1 = require("./providers/auth.service");
var encryption_provider_1 = require("./providers/encryption.provider");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                common_1.forwardRef(function () { return users_module_1.UsersModule; }),
                config_1.ConfigModule.forFeature(jwt_config_1["default"]),
                jwt_1.JwtModule.registerAsync(jwt_config_1["default"].asProvider()),
            ],
            providers: [google_authentication_service_1.GoogleAuthenticationService, generate_tokens_provider_1.GenerateTokensProvider, jwt_strategy_1.JwtStrategy, auth_service_1.AuthService, encryption_provider_1.EncryptionProvider],
            exports: [auth_service_1.AuthService],
            controllers: [google_authentication_controller_1.GoogleAuthenticationController]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
