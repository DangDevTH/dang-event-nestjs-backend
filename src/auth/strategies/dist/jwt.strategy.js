"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JwtStrategy = void 0;
var passport_jwt_1 = require("passport-jwt");
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var JwtStrategy = /** @class */ (function (_super) {
    __extends(JwtStrategy, _super);
    function JwtStrategy(authService, configService) {
        var _this = _super.call(this, {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret')
        }) || this;
        _this.authService = authService;
        return _this;
    }
    JwtStrategy.prototype.validate = function (payload) {
        console.log('validate', payload);
        try {
            return this.authService.validateJwtUser(payload.sub);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    };
    JwtStrategy = __decorate([
        common_1.Injectable()
    ], JwtStrategy);
    return JwtStrategy;
}(passport_1.PassportStrategy(passport_jwt_1.Strategy)));
exports.JwtStrategy = JwtStrategy;
